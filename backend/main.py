import json
from datetime import datetime

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from groq import Groq
from dotenv import load_dotenv

import os
import requests

load_dotenv()

# =========================
# GROQ CLIENT
# =========================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================
# FASTAPI APP
# =========================

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================
# HINDSIGHT SERVER
# =========================

HINDSIGHT_URL = "http://localhost:8888"

# =========================
# REQUEST MODEL
# =========================

class ChatRequest(BaseModel):

    message: str

    embeddings_enabled: bool = True

# =========================
# LOAD MEMORY
# =========================

def load_memory():

    try:

        with open(
            "memory.json",
            "r"
        ) as file:

            return json.load(file)

    except:

        return []

# =========================
# SAVE MEMORY
# =========================

def save_memory(memory):

    with open(
        "memory.json",
        "w"
    ) as file:

        json.dump(
            memory,
            file,
            indent=2
        )

# =========================
# SAFE HINDSIGHT STORE
# =========================

def store_in_hindsight(content):

    try:

        requests.post(

            f"{HINDSIGHT_URL}/retain",

            json={

                "memory_bank_id":
                "recallops-memory",

                "content": content
            },

            timeout=1
        )

    except Exception as e:

        print(
            "Hindsight store skipped:",
            e
        )

# =========================
# SAFE HINDSIGHT RECALL
# =========================

def recall_from_hindsight(query):

    try:

        response = requests.post(

            f"{HINDSIGHT_URL}/recall",

            json={

                "memory_bank_id":
                "recallops-memory",

                "query": query
            },

            timeout=1
        )

        return response.json()

    except Exception as e:

        print(
            "Hindsight recall skipped:",
            e
        )

        return None

# =========================
# LIGHTWEIGHT SEMANTIC MATCH
# =========================

def find_similar_incident(
    current_message,
    memory
):

    if len(memory) == 0:
        return None

    current_words = set(
        current_message.lower().split()
    )

    best_match = None

    highest_score = 0

    recent_memory = memory[-5:]

    for item in recent_memory:

        stored_words = set(
            item["incident"]
            .lower()
            .split()
        )

        common_words = (
            current_words
            .intersection(stored_words)
        )

        similarity = int(

            (
                len(common_words)
                /
                max(
                    len(current_words),
                    1
                )
            ) * 100
        )

        if similarity > highest_score:

            highest_score = similarity

            best_match = {

                "incident":
                item["incident"],

                "resolution":
                item["resolution"],

                "score":
                similarity
            }

    if highest_score > 30:

        return best_match

    return None

# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {

        "message": "Backend running"
    }

# =========================
# CHAT
# =========================

@app.post("/chat")
def chat(req: ChatRequest):

    print(
        "New incident received"
    )

    memory = load_memory()

    hindsight_memories = None

    # SAFE HINDSIGHT RECALL

    try:

        hindsight_memories = (
            recall_from_hindsight(
                req.message
            )
        )

    except Exception as e:

        print(
            "Hindsight unavailable:",
            e
        )

    similar_incident = None

    # SAFE SEMANTIC SEARCH

    if req.embeddings_enabled:

        similar_incident = (
            find_similar_incident(
                req.message,
                memory
            )
        )

    previous_context = ""

    if similar_incident:

        previous_context = f"""

        Previous Similar Incident:
        {similar_incident['incident']}

        Previous Resolution:
        {similar_incident['resolution']}
        """

    # =========================
    # AI RESPONSE
    # =========================

    try:

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {

                    "role": "system",

                    "content": f"""

                    You are an AI incident
                    response engineer.

                    Use previous operational
                    incidents if relevant.

                    Hindsight operational memory
                    is enabled.

                    {previous_context}
                    """
                },

                {

                    "role": "user",

                    "content": req.message
                }
            ]
        )

        reply = (
            completion
            .choices[0]
            .message
            .content
        )

    except Exception as e:

        print(
            "Groq AI failed:",
            e
        )

        reply = (
            "AI response generation failed."
        )

    # =========================
    # SAVE LOCAL MEMORY
    # =========================

    new_memory = {

        "incident":
        req.message,

        "resolution":
        reply,

        "timestamp":
        str(datetime.now())
    }

    memory.append(new_memory)

    save_memory(memory)

    # =========================
    # SAFE HINDSIGHT STORE
    # =========================

    try:

        store_in_hindsight(

            f"""

            Incident:
            {req.message}

            Resolution:
            {reply}
            """
        )

    except Exception as e:

        print(
            "Hindsight store failed:",
            e
        )

    return {

        "reply": reply,

        "similar_incident":
        similar_incident,

        "severity": "Medium",

        "hindsight_enabled":
        True
    }