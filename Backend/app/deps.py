from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
import os
from .db import get_db
from bson import ObjectId

JWT_SECRET = os.getenv("JWT_SECRET", "change-me")
JWT_ALG = "HS256"

bearer = HTTPBearer(auto_error=False)

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(bearer), db = Depends(get_db)):
    if creds is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials")
    token = creds.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        doc = await db.users.find_one({"_id": ObjectId(user_id)})
        if not doc:
            raise HTTPException(status_code=401, detail="User not found")
        # normalize for responses
        doc["id"] = str(doc["_id"])
        return doc
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
