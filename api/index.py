"""Vercel serverless entry point for the CaseVault FastAPI backend.

Vercel's filesystem is read-only except /tmp, so the SQLite database is created
there and populated from the bundled Markdown documents on each cold start.
"""
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "backend"))

os.environ.setdefault("DATABASE_URL", "sqlite:////tmp/casevault.db")
os.environ.setdefault("DOCUMENTS_DIR", str(ROOT / "documents"))

from main import app  # noqa: E402
from app.database import SessionLocal  # noqa: E402
from app.services import DocumentService  # noqa: E402

_db = SessionLocal()
try:
    DocumentService(_db).sync_documents_from_disk()
finally:
    _db.close()
