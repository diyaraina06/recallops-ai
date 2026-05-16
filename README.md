# RecallOps 🚀

AI-Powered Incident Response & Operational Memory Platform

## Overview

RecallOps is an AI-driven operational intelligence platform designed to help DevOps teams and infrastructure engineers analyze, recall, and resolve production incidents faster.

The platform combines:
- AI-powered incident analysis
- Semantic memory retrieval
- Operational observability
- Runtime analytics
- Historical incident recall

to simulate a modern AI Incident Response Center.

---

# Features

## AI Incident Resolution
Uses Groq LLMs to generate detailed incident analysis and resolution strategies.

## Semantic Incident Retrieval
Detects similar historical incidents and retrieves previous resolutions intelligently.

## Runtime Analytics
Tracks:
- Latency
- AI cost
- Memory hits
- Runtime operational metrics

## Operational Memory
Stores previous incidents and resolutions for future contextual retrieval.

## Hindsight Integration
Supports operational memory recall using Hindsight architecture.

## Modern SaaS UI
Responsive dashboard built with React and TailwindCSS.

---

# Tech Stack

## Frontend
- React
- Vite
- TailwindCSS
- Lucide Icons
- Axios

## Backend
- FastAPI
- Groq API
- Python
- JSON-based memory persistence

## Deployment
- Frontend: Vercel
- Backend: Render

---

# Architecture

User Incident
↓
Frontend Dashboard
↓
FastAPI Backend
↓
Semantic Memory Retrieval
↓
Groq LLM Analysis
↓
AI Resolution Response
↓
Memory Persistence + Runtime Analytics

---

# Example Incidents

- AWS load balancer returning 502 Bad Gateway errors
- Kubernetes pods restarting continuously after deployment
- PostgreSQL database latency increased suddenly
- Redis cache causing high latency spikes
- Docker containers crashing after CI/CD deployment

---

# Deployment Links

## Frontend
https://recallops-ai-wv3w.vercel.app/

## Backend
https://recallops-ai.onrender.com

---

# Local Setup

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload