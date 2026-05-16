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

@app.get("/")
def home():
    return {"message": "Backend running"}

@app.post("/chat")
def chat(req: ChatRequest):

    completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an AI incident response engineer helping debug production systems."
            },
            {
                "role": "user",
                "content": req.message
            }
        ]
    )

    reply = completion.choices[0].message.content

    return {
        "reply": reply
    }