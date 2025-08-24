import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .authentication import router as auth_router
from .db import ensure_indexes

load_dotenv()

origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")]

app = FastAPI(title="Fintech Backend (FastAPI + MongoDB)")

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register authentication routes
app.include_router(auth_router)

# Startup event → Create indexes
@app.on_event("startup")
def _startup():
    ensure_indexes()  # no await since it's sync

# Health check
@app.get("/health")
def health():
    return {"ok": True}
