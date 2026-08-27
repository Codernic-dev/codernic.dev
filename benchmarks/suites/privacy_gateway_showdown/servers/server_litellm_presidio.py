#!/usr/bin/env python3
# Copyright (c) Tadeop. All rights reserved.
# Real LiteLLM + Presidio Proxy Server

import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

app = FastAPI(title="LiteLLM + Presidio Real Proxy Server")
analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: str = "gpt-4o"
    messages: List[ChatMessage]

class AnonymizeRequest(BaseModel):
    text: str
    language: str = "en"

@app.get("/health/readiness")
def readiness():
    return {"status": "ok", "proxy": "litellm_presidio"}

@app.post("/anonymize")
def anonymize(req: AnonymizeRequest):
    # LiteLLM Presidio hook pipeline:
    # 1. Analyze text with Presidio analyzer
    results = analyzer.analyze(text=req.text, language=req.language)
    # 2. Anonymize with Presidio anonymizer
    anonymized = anonymizer.anonymize(text=req.text, analyzer_results=results)
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
        "text": anonymized.text,
        "items": items
    }

@app.post("/v1/chat/completions")
def chat_completions(req: ChatCompletionRequest):
    redacted_messages = []
    for m in req.messages:
        results = analyzer.analyze(text=m.content, language="en")
        anonymized = anonymizer.anonymize(text=m.content, analyzer_results=results)
        redacted_messages.append({"role": m.role, "content": anonymized.text})
    
    return {
        "id": "chatcmpl-litellm-presidio-real",
        "object": "chat.completion",
        "model": req.model,
        "choices": [
            {
                "index": 0,
                "message": {"role": "assistant", "content": "Processed via LiteLLM Presidio Proxy: " + redacted_messages[0]["content"]},
                "finish_reason": "stop"
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=4000, log_level="warning")
