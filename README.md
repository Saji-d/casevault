# CaseVault

Legal document search for Bangladeshi law: a FastAPI backend and a Next.js frontend for browsing, filtering and keyword-searching statutes, constitutional articles and court judgements.

**Status: Phase 1 prototype.** Development is paused and may resume. This repository shows the project exactly as far as it was built.

- Live app: https://casevault-bd.vercel.app
- API: https://casevault-bd-api.vercel.app (interactive docs at `/docs`)

## What is built (Phase 1)

- **Document corpus:** 46 Markdown documents in `documents/` (acts, constitution, civil, criminal, labour, tax, judgements), each with YAML front matter (title, year, category, act number, language, status, jurisdiction, tags). The documents were authored with `generate_docs.py` as seed content; there is no upload or OCR pipeline.
- **Sync:** on startup the backend parses the Markdown files and upserts them into the database by slug.
- **Search:** case-insensitive keyword search (SQL `ILIKE`) across title, summary, content, category and tags, with title matches ranked first. Filters for category, year, language, status and tag; sorting and pagination.
- **API:** document list, detail, recent, popular, categories, filter options, corpus stats, and a sync endpoint.
- **Frontend:** a Next.js home page with search, an advanced filter drawer, results and a document reader.

## What is not built yet (Phase 2)

These are planned only. None of them exist in the code:

- Semantic / vector search, embeddings and a GraphRAG layer (vector database + knowledge graph)
- LLM-powered chat or legal assistant
- OCR and document upload / ingestion pipeline
- Authentication, user accounts and multi-tenant firm workspaces

The `/chat`, `/dashboard`, `/workspace`, `/library` and `/admin` pages are placeholders labelled "Prepared for Phase 2". The target architecture is described in [`Plan.md`](Plan.md).

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, SQLAlchemy, Pydantic |
| Database | SQLite (PostgreSQL supported via `DATABASE_URL`) |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion |
| Deployment | Vercel (frontend and API as separate projects) |

## Project structure

```
backend/            FastAPI app (routers, services, repositories, models)
documents/          Markdown legal corpus with YAML front matter
frontend/           Next.js app
api/index.py        Vercel serverless entry point for the API
generate_docs.py    Script used to author the seed documents
Plan.md             Target architecture and roadmap (not yet implemented)
```

## Run locally

Backend:

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python main.py                 # http://localhost:8000, docs at /docs
```

Frontend:

```bash
cd frontend
npm install
npm run dev                    # http://localhost:3000
```

The frontend calls `http://localhost:8000` by default. Set `NEXT_PUBLIC_API_URL` to point it elsewhere.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./casevault.db` | Database connection string |
| `DOCUMENTS_DIR` | `documents/` in the repo | Folder of Markdown documents to sync |
| `ALLOWED_ORIGINS` | localhost:3000 | JSON list of origins allowed by CORS |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | API base URL used by the frontend |

On Vercel the API uses a SQLite database in `/tmp` that is rebuilt from `documents/` on each cold start.

## Known limitations

- No authentication: every endpoint is public, including `POST /documents/sync`.
- Keyword search only (no full-text index, stemming or semantic ranking).
- The corpus is static seed content, not an ingested collection of official documents.
