# LLM Validator App

**LLM Validator App** è un'applicazione containerizzata progettata per validare e formattare le risposte dei modelli di linguaggio (LLM). L'obiettivo principale è garantire che l'output generato dall'AI aderisca rigidamente a schemi dati strutturati e tipizzati.

## 🛠️ Architettura e Flusso Dati

Il diagramma sottostante mostra il ciclo di vita della richiesta, l'isolamento dell'ambiente e il meccanismo di validazione dell'output:

```text
[ Utente / Client ] --( Richiesta HTTP )--> [  🐳 Docker Container  ]
                                           |  - Isola l'app Python
                                           |  - Gestisce l'ambiente
                                           |
                                           V
[ OpenAI / LLM ] <--( Prompt + Schema )-- [ 🪵 Instructor ]
       |                                           ^
       +-----------( Testo Grezzo )----------------+
                                                   | (Parsa e valida)
                                                   V
[ Client / Output ] <---( JSON Validato )-- [ 📐 Pydantic Model ]
```

## ⚙️ Componenti Chiave

*   **🐳 Docker:** Fornisce un ambiente isolato, riproducibile e pronto all'uso. Impacchetta il codice Python, le dipendenze e le variabili d'ambiente (come le API Key), garantendo che l'app funzioni identicamente su qualsiasi server o PC locale.
*   **🔄 Passaggio dei Dati:** L'utente invia una richiesta all'applicazione. Quest'ultima istruisce l'LLM inviando il prompt insieme alla struttura desiderata. L'LLM risponde, e i dati grezzi vengono intercettati e processati prima di essere restituiti all'utente in formato pulito.
*   **🛠️ Instructor:** Funge da ponte intelligente tra l'LLM e il codice Python. Estende le librerie client dei modelli di linguaggio (es. OpenAI) per forzare l'API a rispondere seguendo la modalità `JSON mode` o il function calling strutturato.
*   **📐 Pydantic:** Definisce lo schema dei dati (il "contratto"). Prende la risposta parsatasi da Instructor e convalida i tipi di dato (es. stringhe, numeri, email). Se i dati non rispettano le regole impostate, genera un errore o forza l'LLM a correggersi.

## 🚀 Come Iniziare

1. Clona il repository:
   ```bash
   git clone https://github.com
   ```
2. Configura le tue variabili d'ambiente nel file `.env`.
3. Avvia l'applicazione con Docker:
   ```bash
   docker build -t llm-validator-app .
   docker run -p 8000:8000 --env-file .env llm-validator-app
   ```
