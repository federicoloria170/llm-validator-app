import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import instructor
from groq import Groq
import tiktoken
from models import WordAnalysis, AnalysisResponse

app = FastAPI(title="LLM Groq + Pydantic Validator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inizializzazione client Groq patchato con Instructor
client = instructor.from_groq(Groq(api_key=os.getenv("GROQ_API_KEY")))

# Tokenizer di supporto
enc = tiktoken.get_encoding("cl100k_base")

# Tariffe indicative per Groq (es. Llama 3)
COST_PER_INPUT_TOKEN = 0.05 / 1_000_000
COST_PER_OUTPUT_TOKEN = 0.08 / 1_000_000

@app.post("/api/analyze", response_model=AnalysisResponse)
def analyze_word(data: dict):
    text = data.get("text", "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Testo non fornito")

    prompt = f"Analizza la seguente parola o frammento inserito dall'utente: '{text}'"
    input_tokens = len(enc.encode(prompt))

    try:
        # Chiamata a Groq con forzatura dello schema Pydantic tramite Instructor
        # Chiamata a Groq con il modello supportato
        response, raw_completion = client.chat.completions.create_with_completion(
            model="openai/gpt-oss-20b",
            response_model=WordAnalysis,
            messages=[
                {"role": "system", "content": "Sei un assistente linguistico preciso. Fornisci sinonimi, contrari e spiegazioni brevi."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
        )
        
        completion_text = str(response.model_dump_json())
        output_tokens = len(enc.encode(completion_text))
        total_tokens = input_tokens + output_tokens
        
        cost = (input_tokens * COST_PER_INPUT_TOKEN) + (output_tokens * COST_PER_OUTPUT_TOKEN)

        return AnalysisResponse(
            result=response,
            prompt_tokens=input_tokens,
            completion_tokens=output_tokens,
            total_tokens=total_tokens,
            estimated_cost_usd=round(cost, 6)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))