from pydantic import BaseModel, Field

class WordAnalysis(BaseModel):
    word: str = Field(description="La parola analizzata")
    synonym: str = Field(description="Un sinonimo adatto del termine")
    antonym: str = Field(description="Un contrario adatto del termine")
    explanation: str = Field(description="Spiegazione concisa del termine, massimo 20 parole", max_length=150)

class AnalysisResponse(BaseModel):
    result: WordAnalysis
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
    estimated_cost_usd: float