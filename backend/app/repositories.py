import re
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, and_, desc, asc, func, exists, case
from app.models import Document, Tag, document_tag
from app.schemas import DocumentCreate, DocumentUpdate
from datetime import date, datetime
from typing import List, Tuple, Optional, Dict, Any

class DocumentRepository:
    """
    Handles database operations for Documents and Tags.
    Encapsulates all database-specific query logic.
    """
    
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, doc_id: int) -> Optional[Document]:
        return self.db.query(Document).options(joinedload(Document.tags)).filter(Document.id == doc_id).first()

    def get_by_slug(self, slug: str) -> Optional[Document]:
        return self.db.query(Document).options(joinedload(Document.tags)).filter(Document.slug == slug).first()

    def increment_views(self, slug: str) -> Optional[Document]:
        doc = self.get_by_slug(slug)
        if doc:
            doc.search_views += 1
            self.db.commit()
            self.db.refresh(doc)
        return doc

    def get_or_create_tag(self, name: str) -> Tag:
        tag_name = name.strip().lower()
        tag = self.db.query(Tag).filter(Tag.name == tag_name).first()
        if not tag:
            tag = Tag(name=tag_name)
            self.db.add(tag)
            self.db.commit()
            self.db.refresh(tag)
        return tag

    def create_or_update(self, doc_data: Dict[str, Any]) -> Document:
        """
        Creates a document if it doesn't exist, or updates it if it does.
        Synchronizes tags.
        """
        slug = doc_data["slug"]
        tags_list = doc_data.pop("tags", [])
        
        # Get existing document by slug
        db_doc = self.db.query(Document).filter(Document.slug == slug).first()
        
        # Convert tags to Tag models
        tag_models = [self.get_or_create_tag(tname) for tname in tags_list]
        
        if db_doc:
            # Update fields
            for key, val in doc_data.items():
                setattr(db_doc, key, val)
            db_doc.tags = tag_models
        else:
            # Create new
            db_doc = Document(**doc_data)
            db_doc.tags = tag_models
            self.db.add(db_doc)
            
        self.db.commit()
        self.db.refresh(db_doc)
        return db_doc

    def get_recent(self, limit: int = 5) -> List[Document]:
        """
        Gets recently updated documents.
        """
        return (
            self.db.query(Document)
            .options(joinedload(Document.tags))
            .order_by(desc(Document.updated_at), desc(Document.year))
            .limit(limit)
            .all()
        )

    def get_popular(self, limit: int = 5) -> List[Document]:
        """
        Gets most viewed documents.
        """
        return (
            self.db.query(Document)
            .options(joinedload(Document.tags))
            .order_by(desc(Document.search_views))
            .limit(limit)
            .all()
        )

    def get_categories(self) -> List[str]:
        """
        Gets all distinct categories.
        """
        results = self.db.query(Document.category).distinct().all()
        return sorted([r[0] for r in results if r[0]])

    def get_unique_filters(self) -> Dict[str, List[Any]]:
        """
        Returns lists of unique values for metadata filters.
        """
        categories = self.get_categories()
        
        # Distinct tags
        tags_results = self.db.query(Tag.name).order_by(Tag.name).all()
        tags = [r[0] for r in tags_results]
        
        # Distinct years
        years_results = self.db.query(Document.year).distinct().all()
        years = sorted([r[0] for r in years_results if r[0]], reverse=True)
        
        # Distinct languages
        languages_results = self.db.query(Document.language).distinct().all()
        languages = sorted([r[0] for r in languages_results if r[0]])
        
        # Distinct statuses
        statuses_results = self.db.query(Document.status).distinct().all()
        statuses = sorted([r[0] for r in statuses_results if r[0]])
        
        # Distinct sources
        sources_results = self.db.query(Document.source).distinct().all()
        sources = sorted([r[0] for r in sources_results if r[0]])
        
        return {
            "categories": categories,
            "tags": tags,
            "years": years,
            "languages": languages,
            "statuses": statuses,
            "sources": sources
        }

    def get_stats(self) -> Dict[str, Any]:
        """
        Gathers corpus statistics.
        """
        total = self.db.query(Document).count()
        total_acts = self.db.query(Document).filter(Document.category == "General Act").count()
        total_judgements = self.db.query(Document).filter(Document.category == "Judgement").count()
        total_categories = self.db.query(Document.category).distinct().count()
        
        # Category breakdown
        breakdown_res = (
            self.db.query(Document.category, func.count(Document.id))
            .group_by(Document.category)
            .all()
        )
        breakdown = {cat: count for cat, count in breakdown_res}
        
        return {
            "total_documents": total,
            "total_acts": total_acts,
            "total_judgements": total_judgements,
            "total_categories": total_categories,
            "documents_by_category": breakdown
        }

    def search_and_filter(
        self,
        keyword: Optional[str] = None,
        title: Optional[str] = None,
        category: Optional[str] = None,
        year: Optional[int] = None,
        act_number: Optional[str] = None,
        language: Optional[str] = None,
        status: Optional[str] = None,
        tag: Optional[str] = None,
        sort_by: str = "relevance",
        page: int = 1,
        limit: int = 10
    ) -> Tuple[List[Document], int]:
        """
        Performs keyword search across title, content, summary, category, tags,
        and filename. Filters on metadata, sorts results, and applies pagination.
        Results are ranked: title matches first, then summary, then content/other.
        Case-insensitive, partial matching, whitespace-trimmed.
        """
        query = self.db.query(Document).options(joinedload(Document.tags))

        filters = []

        if keyword:
            # Every word must match somewhere, so "Penal Code 1860" finds
            # "The Penal Code, 1860" despite the punctuation in between.
            terms = re.findall(r"\w+", keyword) or [keyword.strip()]
            for term in terms:
                # Tag name search via correlated subquery (no join duplication)
                tag_match = exists().where(
                    and_(
                        document_tag.c.document_id == Document.id,
                        document_tag.c.tag_id == Tag.id,
                        Tag.name.ilike(f"%{term}%")
                    )
                )

                filters.append(
                    or_(
                        Document.title.ilike(f"%{term}%"),
                        Document.content.ilike(f"%{term}%"),
                        Document.summary.ilike(f"%{term}%"),
                        Document.category.ilike(f"%{term}%"),
                        Document.slug.ilike(f"%{term}%"),
                        tag_match
                    )
                )

        if title:
            filters.append(Document.title.ilike(f"%{title.strip()}%"))
        if category:
            filters.append(Document.category == category)
        if year:
            filters.append(Document.year == year)
        if act_number:
            filters.append(Document.act_number.ilike(f"%{act_number.strip()}%"))
        if language:
            filters.append(Document.language == language)
        if status:
            filters.append(Document.status == status)

        if tag:
            tag_clean = tag.strip().lower()
            query = query.join(Document.tags).filter(Tag.name == tag_clean)

        if filters:
            query = query.filter(and_(*filters))

        # Sorting: relevance ranks by match quality, then recency
        if sort_by == "newest":
            query = query.order_by(desc(Document.updated_at), desc(Document.year), desc(Document.id))
        elif sort_by == "oldest":
            query = query.order_by(asc(Document.updated_at), asc(Document.year), asc(Document.id))
        elif sort_by == "alphabetical":
            query = query.order_by(asc(Document.title))
        else:
            if keyword:
                kw = keyword.strip()
                title_exact = case(
                    (Document.title.ilike(kw), 0),
                    (Document.title.ilike(f"{kw}%"), 1),
                    (Document.title.ilike(f"%{kw}%"), 2),
                    else_=5
                )
                # More query words in the title or slug ranks higher
                terms = re.findall(r"\w+", kw) or [kw]
                title_hits = sum(
                    case(
                        (or_(Document.title.ilike(f"%{t}%"), Document.slug.ilike(f"%{t}%")), 1),
                        else_=0
                    )
                    for t in terms
                )
                summary_match = case(
                    (Document.summary.ilike(f"%{kw}%"), 0),
                    else_=2
                )
                query = query.order_by(title_exact, desc(title_hits), summary_match, desc(Document.year))
            else:
                query = query.order_by(desc(Document.updated_at), desc(Document.year))

        total_count = query.count()
        offset = (page - 1) * limit
        items = query.offset(offset).limit(limit).all()

        return items, total_count
