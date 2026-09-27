from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List, Dict

class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagOut(TagBase):
    id: int

    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    title: str
    year: int
    category: str
    act_number: Optional[str] = None
    language: str
    status: str
    jurisdiction: str
    source: str
    updated_at: Optional[date] = None
    summary: Optional[str] = None
    file_path: str

class DocumentCreate(DocumentBase):
    slug: str
    content: str
    tags: List[str] = []

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    year: Optional[int] = None
    category: Optional[str] = None
    act_number: Optional[str] = None
    language: Optional[str] = None
    status: Optional[str] = None
    jurisdiction: Optional[str] = None
    source: Optional[str] = None
    updated_at: Optional[date] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

# For listing search results (excludes large 'content' field)
class DocumentListItem(BaseModel):
    id: int
    slug: str
    title: str
    year: int
    category: str
    act_number: Optional[str] = None
    language: str
    status: str
    jurisdiction: str
    source: str
    updated_at: Optional[date] = None
    summary: Optional[str] = None
    search_views: int
    tags: List[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Full document details (includes 'content')
class DocumentOut(DocumentListItem):
    content: str

    class Config:
        from_attributes = True

class SearchResponse(BaseModel):
    items: List[DocumentListItem]
    total: int
    page: int
    pages: int
    limit: int

class FilterOptions(BaseModel):
    categories: List[str]
    tags: List[str]
    years: List[int]
    languages: List[str]
    statuses: List[str]
    sources: List[str]

class StatsResponse(BaseModel):
    total_documents: int
    total_acts: int
    total_judgements: int
    total_categories: int
    documents_by_category: Dict[str, int]
