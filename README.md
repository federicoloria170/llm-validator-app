🤖 LLM Validator AppValidatore e Filtro Intelligente per Output di LLMUn'infrastruttura containerizzata con Docker in cui Python agisce da "cervello e setaccio", analizzando, pulendo e strutturando le risposte dei modelli linguistici prima che arrivino all'utente o ai sistemi aziendali.🏗️ Architettura Generale (Infrastruttura Docker)L'intero progetto gira all'interno di un ambiente Docker Compose. Ogni elemento è isolato nel proprio container per garantire sicurezza, modularità e facilità di avvio.       [ 🌐 UTENTE / CLIENT ]
                 │
                 │ HTTP (Porta 3000)
                 ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ 🐳 AMBIENTE DOCKER (Docker Network)                         │
 │                                                             │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │ 🎨 Container Frontend (UI)                          │   │
 │   │ Porta interna: 3000                                 │   │
 │   └──────────────────────────┬──────────────────────────┘   │
 │                              │ API Request                  │
 │                              ▼                              │
 │   ┌─────────────────────────────────────────────────────┐   │
 │   │ 🐍 Container Backend (Python Core Engine)           │   │
 │   │ Porta interna: 8000                                 │   │
 │   │                                                     │   │
 │   │  • Riceve il prompt                                 │   │
 │   │  • Chiama l'LLM                                     │   │
 │   │  • FILTRA E VALIDA I DATI (Filtro Python)          │   │
 │   └──────────────────────────┬──────────────────────────┘   │
 │                              │                              │
 └──────────────────────────────┼──────────────────────────────┘
                                │ API Call
                                ▼
                      [ 🤖 Modello LLM / API ]
🔌 Mappa delle Porte e dei ServiziServizio DockerContainerPorta Host (Tua Macchina)Porta Interna DockerDescrizioneFrontendllm-ui30003000Interfaccia utente visivaBackend (Python)llm-api80008000Motore di calcolo e filtro datiDatabase (opz.)llm-db54325432Storico log e validazioni🐍 Il Ruolo di Python: "Il Setaccio dei Dati"I modelli linguistici (LLM) spesso restituiscono testo vuoto, formattazioni errate, dati sensibili o informazioni inventate (allucinazioni).Python non si limita a passare il testo, ma lo trasforma e lo valida attraverso 4 fasi chiave:   [ Output Grezzo dell'LLM ]
             │
             ▼
┌───────────────────────────┐
│  1. SANITIZZAZIONE        │ 🧼 Rimuove caratteri speciali, tag vietati e dati sensibili
└────────────┬──────────────┘
             ▼
┌───────────────────────────┐
│  2. VALIDAZIONE SCHEMA    │ 📐 Verifica che la risposta segua la struttura richiesta (JSON, tipi di dati)
└────────────┬──────────────┘
             ▼
┌───────────────────────────┐
│  3. FILTRAGGIO REGOLARE   │ ✂️ Elimina allucinazioni, testo ridondante o risposte fuori target
└────────────┬──────────────┘
             ▼
┌───────────────────────────┐
│  4. ASSEGNAZIONE SCORE    │ 📊 Calcola un punteggio di affidabilità della risposta
└────────────┬──────────────┘
             ▼
   [ Output Pulito e Valido ]
Concetti chiave della logica Python:Input Grezzo: Riceve il testo puro generated dall'LLM.Parsing & Structure: Forza la risposta dentro un formato strutturato e sicuro per l'applicazione.Controllo Criteri: Scarta le risposte che non superano i test di qualità/sicurezza impostati.Output Finale: Invia al Frontend solo i dati certificati e pronti all'uso.🔄 Flusso Completo di FunzionamentoEcco come viaggia la richiesta dall'inizio alla fine:[Utente] ──1. Invia Prompt──► [Frontend (Porta 3000)]
                                    │
                                2. Passa richiesta
                                    ▼
                             [Backend Python (Porta 8000)]
                                    │
                                3. Chiama API
                                    ▼
                             [Modello LLM External/Local]
                                    │
                                4. Ritorna testo grezzo
                                    ▼
                             [Backend Python (Porta 8000)]
                                    │
                         ┌──────────┴──────────┐
                         │ 🔍 FILTRAGGIO DATI  │
                         └──────────┬──────────┘
                                    │
                                5. Dati validati
                                    ▼
                             [Frontend (Porta 3000)] ──6. Mostra Risultato──► [Utente]
🚀 Come Avviare il Progetto con DockerGrazie alla containerizzazione, non devi installare dipendenze Python o Node.js sulla tua macchina locale.1. Clona il repositorygit clone https://github.com/federicoloria170/llm-validator-app.git
cd llm-validator-app
2. Configura le variabili d'ambienteCrea un file .env inserendo le tue chiavi API:cp .env.example .env
3. Avvia tutti i servizi con un solo comandodocker-compose up --build
L'applicazione sarà subito raggiungibile su:Frontend / UI: http://localhost:3000Backend API Docs: http://localhost:8000/docs


















                                
                                    ▼
                             [Frontend (Porta 3000)] ──6. Mostra Risultato──► [Utente]
