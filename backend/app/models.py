from sqlalchemy import Column, Integer, String, Text, Date, DateTime, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

# Association table for Document <-> Tag (Many-to-Many)
document_tag = Table(
    "document_tag",
    Base.metadata,
    Column("document_id", Integer, ForeignKey("documents.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
)

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)

    # Relationships
    documents = relationship("Document", secondary=document_tag, back_populates="tags")


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(500), nullable=False)
    year = Column(Integer, index=True, nullable=False)
    category = Column(String(255), index=True, nullable=False)
    act_number = Column(String(100), nullable=True)
    language = Column(String(50), index=True, nullable=False)
    status = Column(String(50), index=True, nullable=False)
    jurisdiction = Column(String(100), nullable=False)
    source = Column(String(255), nullable=False)
    updated_at = Column(Date, nullable=True)
    
    # Core contents
    content = Column(Text, nullable=False)  # Markdown content
    summary = Column(Text, nullable=True)   # Extracted summary
    file_path = Column(String(500), nullable=False)
    
    # Metrics
    search_views = Column(Integer, default=0, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_db_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    tags = relationship("Tag", secondary=document_tag, back_populates="documents")
