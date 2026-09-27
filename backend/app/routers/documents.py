from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import DocumentService, SearchService
from app.schemas import (
    DocumentOut, 
    SearchResponse, 
    FilterOptions, 
    StatsResponse,
    DocumentListItem
)
from typing import List, Optional

router = APIRouter()

@router.get("/documents", response_model=SearchResponse)
def get_documents(
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get a paginated list of documents, optionally filtered by category.
    """
    search_service = SearchService(db)
    return search_service.search(category=category, page=page, limit=limit)

@router.get("/documents/recent", response_model=List[DocumentListItem])
def get_recent_documents(
    limit: int = Query(5, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """
    Get the most recently updated documents.
    """
    doc_service = DocumentService(db)
    docs = doc_service.get_recent_documents(limit=limit)
    
    # Map to DocumentListItem
    return [
        DocumentListItem(
            id=d.id,
            slug=d.slug,
            title=d.title,
            year=d.year,
            category=d.category,
            act_number=d.act_number,
            language=d.language,
            status=d.status,
            jurisdiction=d.jurisdiction,
            source=d.source,
            updated_at=d.updated_at,
            summary=d.summary,
            search_views=d.search_views,
            tags=[t.name for t in d.tags],
            created_at=d.created_at
        ) for d in docs
    ]

@router.get("/documents/popular", response_model=List[DocumentListItem])
def get_popular_documents(
    limit: int = Query(5, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """
    Get the most popular (most viewed) documents.
    """
    doc_service = DocumentService(db)
    docs = doc_service.get_popular_documents(limit=limit)
    
    # Map to DocumentListItem
    return [
        DocumentListItem(
            id=d.id,
            slug=d.slug,
            title=d.title,
            year=d.year,
            category=d.category,
            act_number=d.act_number,
            language=d.language,
            status=d.status,
            jurisdiction=d.jurisdiction,
            source=d.source,
            updated_at=d.updated_at,
            summary=d.summary,
            search_views=d.search_views,
            tags=[t.name for t in d.tags],
            created_at=d.created_at
        ) for d in docs
    ]

@router.get("/categories", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    """
    Get all unique categories.
    """
    doc_service = DocumentService(db)
    return doc_service.repo.get_categories()

@router.get("/filters", response_model=FilterOptions)
def get_filters(db: Session = Depends(get_db)):
    """
    Get all unique filter options (years, categories, status, tags, etc.)
    for populating selection UI in the frontend.
    """
    doc_service = DocumentService(db)
    return doc_service.get_filter_options()

@router.get("/stats", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    """
    Get corpus summary statistics.
    """
    doc_service = DocumentService(db)
    return doc_service.get_corpus_stats()

@router.post("/documents/sync", status_code=status.HTTP_200_OK)
def sync_documents(db: Session = Depends(get_db)):
    """
    Trigger reading markdown files from disk and syncing database.
    """
    try:
        doc_service = DocumentService(db)
        synced_count = doc_service.sync_documents_from_disk()
        return {"message": "Sync completed successfully", "synced_count": synced_count}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Sync failed: {str(e)}"
        )

@router.get("/documents/{slug}", response_model=DocumentOut)
def get_document_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Get detailed document including markdown content by its unique slug.
    """
    doc_service = DocumentService(db)
    doc = doc_service.get_document_by_slug(slug)
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with slug '{slug}' not found"
        )
    
    # Map to DocumentOut schema
    return DocumentOut(
        id=doc.id,
        slug=doc.slug,
        title=doc.title,
        year=doc.year,
        category=doc.category,
        act_number=doc.act_number,
        language=doc.language,
        status=doc.status,
        jurisdiction=doc.jurisdiction,
        source=doc.source,
        updated_at=doc.updated_at,
        summary=doc.summary,
        content=doc.content,
        search_views=doc.search_views,
        tags=[t.name for t in doc.tags],
        created_at=doc.created_at
    )
