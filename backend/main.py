from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

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

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

model = SentenceTransformer(
    'all-MiniLM-L6-v2'
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# HINDSIGHT SERVER

HINDSIGHT_URL = "http://localhost:8888"

class ChatRequest(BaseModel):
    message: str
    embeddings_enabled: bool = True

# LOAD MEMORY

def load_memory():

    try:

        with open("memory.json", "r") as file:
            return json.load(file)

    except:
        return []

# SAVE MEMORY

def save_memory(memory):

    with open("memory.json", "w") as file:
        json.dump(memory, file, indent=2)

# SAFE HINDSIGHT STORE

def store_in_hindsight(content):

    try:

        print("Sending memory to Hindsight...")

        requests.post(

            f"{HINDSIGHT_URL}/retain",

            json={

                "memory_bank_id":
                "recallops-memory",

                "content": content
            },

            timeout=1
        )

        print("Memory stored in Hindsight successfully")

    except Exception as e:

        print(
            "Hindsight store skipped:",
            e
        )

# SAFE HINDSIGHT RECALL

def recall_from_hindsight(query):

    try:

        print("Recalling from Hindsight...")

        response = requests.post(

            f"{HINDSIGHT_URL}/recall",

            json={

                "memory_bank_id":
                "recallops-memory",

                "query": query
            },

            timeout=1
        )

        print("Hindsight recall completed")

        return response.json()

    except Exception as e:

        print(
            "Hindsight recall skipped:",
            e
        )

        return None

# SEMANTIC SIMILARITY

def find_similar_incident(
    current_message,
    memory
):

    if len(memory) == 0:
        return None

    current_embedding = model.encode(
        [current_message]
    )

    best_match = None
    highest_score = 0

    for item in memory:

        stored_embedding = model.encode(
            [item["incident"]]
        )

        similarity = cosine_similarity(
            current_embedding,
            stored_embedding
        )[0][0]

        similarity_percentage = int(
            similarity * 100
        )

        if similarity_percentage > highest_score:

            highest_score = similarity_percentage

            best_match = {

                "incident":
                item["incident"],

                "resolution":
                item["resolution"],

                "score":
                similarity_percentage
            }

    if highest_score > 55:
        return best_match

    return None

# HOME

@app.get("/")
def home():

    return {
        "message": "Backend running"
    }

# CHAT

@app.post("/chat")
def chat(req: ChatRequest):

    memory = load_memory()

    # OPTIONAL HINDSIGHT RECALL

    hindsight_memories = (
        recall_from_hindsight(
            req.message
        )
    )

    similar_incident = None

    # EXISTING SEMANTIC SEARCH

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

    # AI RESPONSE

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

    # SAVE LOCAL MEMORY

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

    # OPTIONAL HINDSIGHT STORE

    store_in_hindsight(

        f"""

        Incident:
        {req.message}

        Resolution:
        {reply}
        """
    )

    return {

        "reply": reply,

        "similar_incident":
        similar_incident,

        "severity": "Medium",

        "hindsight_enabled":
        True
    }