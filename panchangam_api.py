from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import datetime

# You must install panchangam and swiss ephemeris in your Python environment
# pip install panchangam
# pip install swisseph

try:
    from PyJHora import PyJHora
except ImportError:
    try:
        from pyjhora import PyJHora
    except ImportError:
        import importlib
        PyJHora = importlib.import_module('PyJHora').PyJHora if importlib.util.find_spec('PyJHora') else importlib.import_module('pyjhora').PyJHora

app = FastAPI()

# Allow CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PanchangamRequest(BaseModel):
    date: str  # YYYY-MM-DD
    latitude: float
    longitude: float
    tz_offset: float = 5.5  # Default IST
    city: Optional[str] = None


@app.post("/api/panchangam")
def get_panchangam(req: PanchangamRequest):
    year, month, day = map(int, req.date.split("-"))
    # PyJHora expects date as dd-mm-yyyy
    date_str = f"{day:02d}-{month:02d}-{year}"
    # PyJHora expects IST offset in hours (e.g., 5.5)
    jhora = PyJHora(
        date=date_str,
        time="06:00",  # default sunrise time, can be improved
        latitude=req.latitude,
        longitude=req.longitude,
        timezone=req.tz_offset
    )
    panchang = jhora.get_panchang()
    result = {
        "date": req.date,
        "tithi": panchang.get("tithi"),
        "nakshatra": panchang.get("nakshatra"),
        "yoga": panchang.get("yoga"),
        "karana": panchang.get("karana"),
        "sunrise": panchang.get("sunrise"),
        "sunset": panchang.get("sunset"),
        # Add more fields as needed
    }
    return result

# To run: uvicorn panchangam_api:app --reload
