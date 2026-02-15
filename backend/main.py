import json
import re
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_engine import get_ai_solution

app = FastAPI(title="AI Ticket Solver API")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Ticket(BaseModel):
    details: str

# Updated Root Endpoint for Health Check
@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "AI Ticket Solver Backend is Running",
        "documentation": "http://127.0.0.1:8000/docs"
    }

@app.post("/solve-ticket")
async def solve(ticket: Ticket):
    ai_output = get_ai_solution(ticket.details)
    
    try:
        # Extract JSON block even if the model adds extra text
        json_match = re.search(r'\{.*\}', ai_output, re.DOTALL)
        if json_match:
            return json.loads(json_match.group(0))
        
        raise ValueError("AI did not return a valid JSON structure.")

    except Exception as e:
        # Structured fallback to prevent frontend crashes
        return {
            "suggested_team": "System Admin (Fallback)",
            "understanding": "Analysis failed.",
            "preparation": "Manual review required.",
            "steps": ["Check backend terminal for raw response", "Verify API Quota"],
            "final_result": f"Error: {str(e)}"
        }

if __name__ == "__main__":
    import uvicorn
    # Running the server
    uvicorn.run(app, host="127.0.0.1", port=8000)