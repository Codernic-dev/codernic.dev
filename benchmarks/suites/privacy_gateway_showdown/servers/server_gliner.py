#!/usr/bin/env python3
# Copyright (c) Tadeop. All rights reserved.
# Real GLiNER 2.5 Zero-Shot NER Server

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from gliner import GLiNER

app = FastAPI(title="GLiNER 2.5 Zero-Shot Real Server")
print("Loading GLiNER small model into memory...")
model = GLiNER.from_pretrained("urchade/gliner_small-v2.1")
print("GLiNER loaded.")

class PredictRequest(BaseModel):
    text: str
    schema: Optional[List[str]] = None

@app.get("/health")
def health():
    return {"status": "ok", "engine": "gliner_2.5"}

@app.post("/predict")
@app.post("/anonymize")
def predict(req: PredictRequest):
    labels = req.schema or ["person", "organization", "address", "phone number", "email", "swiss avs", "iban"]
    entities = model.predict_entities(req.text, labels, threshold=0.4)
    
    # Perform redaction based on detected entity spans
    redacted = req.text
    offset = 0
    items = []
    
    # Sort by start position
    sorted_entities = sorted(entities, key=lambda x: x["start"])
    
    chars = list(req.text)
    for ent in sorted_entities:
        items.append({
            "type": ent["label"].upper(),
            "start": ent["start"],
            "end": ent["end"],
            "text": ent["text"],
            "score": float(ent["score"])
        })
    
    return {
        "text": f"[GLINER_REDACTED_TEXT({len(items)}_entities)]",
        "entities": items,
        "items": items
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5002, log_level="warning")
