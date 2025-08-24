import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read from .env
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "fintechdb")

_client: MongoClient | None = None

def get_client() -> MongoClient:
    """
    Get or create a MongoDB client.
    Ensures we only initialize once (singleton pattern).
    """
    global _client
    if _client is None:
        try:
            _client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
            # Test connection
            _client.admin.command("ping")
            print("✅ MongoDB connection successful")
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            raise
    return _client


def get_db():
    """
    Get the database object.
    """
    return get_client()[DB_NAME]


def ensure_indexes():
    """
    Create necessary indexes for collections.
    """
    db = get_db()
    db.users.create_index("email", unique=True)
    print("✅ Indexes ensured (users.email unique)")
    print("DEBUG MONGODB_URI:", MONGODB_URI)
