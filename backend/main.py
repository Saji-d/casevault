import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.routers import documents, search
from app.services import DocumentService

# Create database tables if they do not exist
# This is a safe fallback for local setup so that migrations aren't strictly required to run first
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend services for CaseVault, an AI-ready Legal Intelligence Platform for Bangladesh.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(documents.router, tags=["Documents"])
app.include_router(search.router, tags=["Search"])

@app.on_event("startup")
def startup_event():
    """
    On startup, synchronize documents from the local markdown files
    to populate the database automatically.
    """
    db = SessionLocal()
    try:
        print("FastAPI starting up: Syncing documents from documents/ directory...")
        service = DocumentService(db)
        synced = service.sync_documents_from_disk()
        print(f"Startup sync completed. {synced} documents loaded/updated.")
    except Exception as e:
        print(f"Warning: Failed to sync documents on startup: {e}")
    finally:
        db.close()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
