# AI Ticket Solver
A full-stack application designed to automate IT support workflows by transforming complex technical tickets and server logs into structured, actionable resolution plans.

# Overview
Manually analyzing IT tickets is time-consuming. This project leverages Large Language Models (LLMs) to provide instant clarity. The system takes raw ticket text and outputs a 4-step plan including core understanding, pre-fix preparation, step-by-step instructions, and expected outcomes.

# Tech Stack
Frontend: React, Vite, Tailwind CSS

Backend: Python, FastAPI, Uvicorn

AI Engine: Hugging Face Inference API (Mistral-7B / Qwen3-Next-80B)

Validation: Pydantic (Data Schemas)

# Key Features
AI-Powered Analysis: Uses advanced reasoning models to categorize and solve infrastructure issues.

Robust Backend Validation: Implements Pydantic schemas to ensure strict type safety and data integrity.

Regex Parsing Safety Net: Utilizes custom Regex logic to extract clean JSON from LLM responses, preventing frontend rendering errors.

Interactive Documentation: Built-in Swagger UI for real-time API testing and schema verification.

Secure Credential Management: Utilizes environment variables (.env) to protect sensitive API tokens.

# Project Structure
Plaintext
├── backend/
│   ├── main.py          # FastAPI routes and Pydantic schemas
│   ├── ai_engine.py     # Hugging Face integration logic
│   └── .env             # API Keys (Protected)
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main dashboard logic
│   │   └── components/  # Modular UI elements
└── README.md
# Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/ai-ticket-solver.git
Backend Setup:

Bash
cd backend
pip install -r requirements.txt
# Add your HF_TOKEN to a .env file
python main.py
Frontend Setup:

Bash
cd frontend
npm install
npm run dev
