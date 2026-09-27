from sqlalchemy.orm import Session
from app.repositories import DocumentRepository
from app.parser import MarkdownLoader
from app.config import settings
from app.models import Document
from app.schemas import FilterOptions, StatsResponse, SearchResponse, DocumentListItem
from typing import List, Optional, Tuple, Dict, Any
import os
import math

class DocumentService:
    """
    Manages higher-level business logic for Documents.
    Coordinates between MarkdownLoader and DocumentRepository.
    """
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = DocumentRepository(db)
        self.loader = MarkdownLoader()

    def sync_documents_from_disk(self) -> int:
        """
        Scans settings.DOCUMENTS_DIR for markdown files, parses them, 
        and updates the database.
        """
        doc_dir = settings.DOCUMENTS_DIR
        if not os.path.exists(doc_dir):
            raise FileNotFoundError(f"Documents folder not found at path: {doc_dir}")
            
        print(f"Starting document sync from: {doc_dir}")
        count = 0
        
        # Scan and load all documents
        for doc_data in self.loader.scan_directory(doc_dir):
            try:
                self.repo.create_or_update(doc_data)
                count += 1
            except Exception as e:
                print(f"Error syncing document {doc_data.get('slug', 'unknown')}: {e}")
                self.db.rollback()
                
        print(f"Successfully synced {count} documents to the database.")
        return count

    def get_document_by_slug(self, slug: str) -> Optional[Document]:
        """
        Retrieves a document by its slug and increments view counts.
        """
        # Increment view count to track popularity
        self.repo.increment_views(slug)
        return self.repo.get_by_slug(slug)

    def get_recent_documents(self, limit: int = 5) -> List[Document]:
        return self.repo.get_recent(limit)

    def get_popular_documents(self, limit: int = 5) -> List[Document]:
        return self.repo.get_popular(limit)

    def get_filter_options(self) -> FilterOptions:
        filters = self.repo.get_unique_filters()
        return FilterOptions(**filters)

    def get_corpus_stats(self) -> StatsResponse:
        stats = self.repo.get_stats()
        return StatsResponse(**stats)


class SearchService:
    """
    Abstracts search functionality.
    In Phase 1, it implements SQL-based keyword and metadata search.
    In future phases, this class (or subclass) can implement Vector Search, 
    Hybrid Search, or integrate with Elasticsearch/Qdrant without changes 
    to the APIs or frontend components.
    """
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = DocumentRepository(db)

    def search(
        self,
        keyword: Optional[str] = None,
        category: Optional[str] = None,
        year: Optional[int] = None,
        act_number: Optional[str] = None,
        language: Optional[str] = None,
        status: Optional[str] = None,
        tag: Optional[str] = None,
        sort_by: str = "relevance",
        page: int = 1,
        limit: int = 10
    ) -> SearchResponse:
        """
        Executes the search and returns a structured SearchResponse.
        """
        items, total = self.repo.search_and_filter(
            keyword=keyword,
            category=category,
            year=year,
            act_number=act_number,
            language=language,
            status=status,
            tag=tag,
            sort_by=sort_by,
            page=page,
            limit=limit
        )
        
        pages = math.ceil(total / limit) if total > 0 else 1
        
        # Convert items to list item representation (Pydantic model)
        list_items = []
        for item in items:
            list_items.append(
                DocumentListItem(
                    id=item.id,
                    slug=item.slug,
                    title=item.title,
                    year=item.year,
                    category=item.category,
                    act_number=item.act_number,
                    language=item.language,
                    status=item.status,
                    jurisdiction=item.jurisdiction,
                    source=item.source,
                    updated_at=item.updated_at,
                    summary=item.summary,
                    search_views=item.search_views,
                    tags=[t.name for t in item.tags],
                    created_at=item.created_at
                )
            )
            
        return SearchResponse(
            items=list_items,
            total=total,
            page=page,
            pages=pages,
            limit=limit
        )
