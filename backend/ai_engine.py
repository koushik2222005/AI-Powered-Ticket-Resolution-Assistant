import os
import re
import json
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

# The Qwen3-Next-80B Model ID
# Use "Qwen/Qwen3-Next-80B-A3B-Thinking" for deep reasoning 
# Or "Qwen/Qwen3-Next-80B-A3B-Instruct" for direct answers
MODEL_ID = "Qwen/Qwen3-Next-80B-A3B-Thinking"

client = InferenceClient(
    model=MODEL_ID,
    token=os.getenv("HF_TOKEN")
)

def clean_qwen_response(text):
    """
    Qwen3 Thinking models often wrap internal reasoning in <think> tags.
    This removes them to ensure the frontend only gets the JSON result.
    """
    cleaned = re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL)
    return cleaned.strip()

def get_ai_solution(ticket_details):
    system_message = """You are a senior IT Support Engineer. Analyze the ticket and return ONLY a valid JSON.
    Format:
    {
      "suggested_team": "Team Name",
      "understanding": "Summary",
      "preparation": "Tools needed",
      "steps": ["Step 1", "Step 2"],
      "final_result": "Goal"
    }"""

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": f"Ticket Details: {ticket_details}"}
    ]

    try:
        # Optimal sampling parameters for Qwen3 Thinking mode
        response = client.chat_completion(
            messages=messages,
            max_tokens=2000, # Thinking models need more tokens for reasoning
            temperature=0.6, # Recommended for thinking mode
            top_p=0.95
        )

        raw_text = response.choices[0].message.content
        return clean_qwen_response(raw_text)

    except Exception as e:
        return json.dumps({"error": f"AI Engine Error: {str(e)}"})