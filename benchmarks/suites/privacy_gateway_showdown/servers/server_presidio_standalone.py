#!/usr/bin/env python3
# Copyright (c) Tadeop. All rights reserved.
# Real Microsoft Presidio Standalone FastAPI Server

import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import RecognizerResult, OperatorConfig

app = FastAPI(title="Presidio Standalone Real Server")
analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

class AnalyzeRequest(BaseModel):
    text: str
    language: str = "en"

class AnonymizeRequest(BaseModel):
    text: str
    language: str = "en"

@app.get("/healthz")
def healthz():
    return {"status": "ok", "engine": "presidio_standalone"}

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    results = analyzer.analyze(text=req.text, language=req.language)
    return [{"type": r.entity_type, "start": r.start, "end": r.end, "score": r.score} for r in results]

@app.post("/anonymize")
def anonymize_text(req: AnonymizeRequest):
    results = analyzer.analyze(text=req.text, language=req.language)
    anonymized_result = anonymizer.anonymize(text=req.text, analyzer_results=results)
    items = []
    for r in results:
        items.append({
            "type": r.entity_type,
            "start": r.start,
            "end": r.end,
            "text": req.text[r.start:r.end],
            "score": r.score
        })
    return {
        "text": anonymized_result.text,
        "items": items
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5001, log_level="warning")
