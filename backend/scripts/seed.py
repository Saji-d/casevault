import os
import sys

# Ensure the backend directory is in the python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, Base, engine
from app.services import DocumentService

def run_seed():
    print("--- CaseVault Database Ingestion & Seeding ---")
    print("1. Creating database tables if they do not exist...")
    Base.metadata.create_all(bind=engine)
    
    print("2. Starting document scanning and parsing...")
    db = SessionLocal()
    try:
        service = DocumentService(db)
        synced_count = service.sync_documents_from_disk()
        print(f"Success: Synced {synced_count} legal documents into the database.")
    except Exception as e:
        print(f"Error during seeding: {e}")
        sys.exit(1)
    finally:
        db.close()
    print("--- Seeding Completed Successfully ---")

if __name__ == "__main__":
    run_seed()
