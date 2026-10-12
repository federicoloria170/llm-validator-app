import React, { useState, useEffect } from 'react';

interface AnalysisData {
  word: string;
  synonym: string;
  antonym: string;
  explanation: string;
}

interface ApiResponse {
  result: AnalysisData;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost_usd: number;
}

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reattività in tempo reale con debounce (interroga l'API dopo 400ms che l'utente smette di digitare)
  useEffect(() => {
    if (!input.trim()) {
      setData(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
        });
        if (!res.ok) throw new Error('Errore nella comunicazione con il backend');
        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Validatore LLM con Pydantic & FastAPI</h2>
      <p>Digita una parola per trovare sinonimo, contrario e spiegazione filtrata in tempo reale.</p>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrivi una parola (es. Felice)..."
        style={{ width: '100%', padding: '12px', fontSize: '16px', boxSizing: 'border-box', marginBottom: '20px' }}
      />

      {loading && <p style={{ color: '#666' }}>Elaborazione in corso tramite LLM...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Risultato Tipizzato (Pydantic)</h3>
          <p><strong>Parola:</strong> {data.result.word}</p>
          <p><strong>Sinonimo:</strong> {data.result.synonym}</p>
          <p><strong>Contrario:</strong> {data.result.antonym}</p>
          <p><strong>Spiegazione (&lt; 20 parole):</strong> {data.result.explanation}</p>
          
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #ccc' }} />
          
          <div style={{ fontSize: '13px', color: '#555' }}>
            <p><strong>Token Prompt:</strong> {data.prompt_tokens}</p>
            <p><strong>Token Completion:</strong> {data.completion_tokens}</p>
            <p><strong>Token Totali:</strong> {data.total_tokens}</p>
            <p><strong>Costo Stimato:</strong> ${data.estimated_cost_usd} USD</p>
          </div>
        </div>
      )}
    </div>
  );
}