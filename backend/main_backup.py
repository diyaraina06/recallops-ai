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

class ChatRequest(BaseModel):
    message: str
    embeddings_enabled: bool = True

def load_memory():

    try:

        with open("memory.json", "r") as file:
            return json.load(file)

    except:
        return []

def save_memory(memory):

    with open("memory.json", "w") as file:
        json.dump(memory, file, indent=2)

def find_similar_incident(current_message, memory):

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
                "incident": item["incident"],
                "resolution": item["resolution"],
                "score": similarity_percentage
            }

    if highest_score > 55:
        return best_match

    return None

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/chat")
def chat(req: ChatRequest):

    memory = load_memory()

    similar_incident = None

    if req.embeddings_enabled:

        similar_incident = find_similar_incident(
            req.message,
            memory
        )

    previous_context = ""

    if similar_incident:

        previous_context = f"""

        Previous Similar Incident:
        {similar_incident['incident']}

        Previous Resolution:
        {similar_incident['resolution']}
        """

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",

                "content": f"""

                You are an AI incident response engineer.

                Use previous operational incidents if relevant.

                {previous_context}
                """
            },

            {
                "role": "user",
                "content": req.message
            }
        ]
    )

    reply = completion.choices[0].message.content

    new_memory = {

        "incident": req.message,
        "resolution": reply,
        "timestamp": str(datetime.now())
    }

    memory.append(new_memory)

    save_memory(memory)

    return {

        "reply": reply,

        "similar_incident": similar_incident,

        "severity": "Medium"
    }