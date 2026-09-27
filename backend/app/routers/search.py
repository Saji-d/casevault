from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import SearchService
from app.schemas import SearchResponse
from typing import Optional

router = APIRouter()

@router.get("/search", response_model=SearchResponse)
def search_documents(
    q: Optional[str] = Query(None, alias="keyword", description="Keyword search in title, summary, and content"),
    title: Optional[str] = Query(None, description="Filter by title matching"),
    category: Optional[str] = Query(None, description="Filter by exact category"),
    year: Optional[int] = Query(None, description="Filter by exact year"),
    act_number: Optional[str] = Query(None, description="Filter by act number"),
    language: Optional[str] = Query(None, description="Filter by exact language"),
    status: Optional[str] = Query(None, description="Filter by exact status"),
    tag: Optional[str] = Query(None, description="Filter by exact tag"),
    sort_by: str = Query("relevance", description="Sorting criteria: relevance, newest, oldest, alphabetical"),
    page: int = Query(1, ge=1, description="Page number for pagination"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """
    Search and filter documents in the legal intelligence corpus.
    Supports full-text keyword search and filters on metadata fields.
    """
    search_service = SearchService(db)
    return search_service.search(
        keyword=q,
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
