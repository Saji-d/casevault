import os
from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "CaseVault Legal Intelligence API"
    API_V1_STR: str = ""
    
    # Database URL: can be PostgreSQL or SQLite
    # Defaults to a local SQLite database for ease of local testing
    DATABASE_URL: str = Field(
        default="sqlite:///./casevault.db",
        env="DATABASE_URL"
    )
    
    # Path to the directory containing markdown files
    DOCUMENTS_DIR: str = Field(
        default=str(Path(__file__).resolve().parents[2] / "documents"),
        env="DOCUMENTS_DIR"
    )
    
    # CORS Origins (allow Next.js frontend to talk to FastAPI backend)
    # Override in deployment with a JSON list, e.g. ALLOWED_ORIGINS='["https://casevault-bd.vercel.app"]'
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
