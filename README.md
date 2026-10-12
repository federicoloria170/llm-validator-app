# 🤖 LLM Validator App

> Un'applicazione intelligente progettata per validare, testare e analizzare l'output e le performance di modelli linguistici di grandi dimensioni (LLM).

---

## 📋 Indice
- [Panoramica del Progetto](#-panoramica-del-progetto)
- [Architettura e Interazione tra gli Elementi](#-architettura-e-interazione-tra-gli-elementi)
- [Porte di Rete e Configurazione](#-porte-di-rete-e-configurazione)
- [Diagramma di Flusso](#-diagramma-di-flusso)
- [Guida all'Installazione e Avvio](#-guida-allinstallazione-e-avvio)

---

## 🔍 Panoramica del Progetto

**llm-validator-app** permette agli sviluppatori di inviare prompt, validare le risposte generate dagli LLM tramite regole personalizzate, metriche di qualità o controlli di sicurezza, e visualizzare i risultati tramite un'interfaccia intuitiva.

---

## ⚙️ Architettura e Interazione tra gli Elementi

L'applicazione è composta principalmente da tre macro-componenti che interagiscono tra loro:

1. **Frontend (Interfaccia Utente):**
   - Espone le schermate di login, la dashboard di inserimento prompt e la visualizzazione dei report di validazione.
   - Comunica tramite richieste HTTP/REST o WebSocket con il backend.

2. **Backend (Core / Engine di Validazione):**
   - Gestisce la logica di business, riceve le richieste dal frontend, formatta i prompt e si interfaccia con le API dei vari LLM (es. OpenAI, Anthropic, o modelli locali).
   - Esegue i moduli di validazione (controllo sintattico, aderenza al contesto, filtri di sicurezza).

3. **Database / Storage (Opzionale):**
   - Archivia lo storico dei test, i prompt inviati e le metriche di validazione per analisi future.

> 💡 *Esempio visivo dell'interazione:*
> ![Schema interazione elementi](assets/architecture-diagram.png) *(Inserisci qui l'immagine del flusso architetturale)*

---

## 🚪 Porte di Rete e Configurazione

Di seguito sono elencate le porte predefinite utilizzate dai servizi dell'applicazione durante lo sviluppo locale:

| Servizio | Porta Predefinita | Descrizione |
| :--- | :--- | :--- |
| **Frontend** | `3000` o `8500` | Interfaccia grafica (es. React / Next.js / Streamlit) |
| **Backend API** | `5000` o `8000` | Server di business logic (es. Flask / FastAPI) |
| **Database** | `5432` o `27017` | Eventuale DB locale (PostgreSQL / MongoDB) |

*Nota: Puoi verificare o modificare le porte all'interno del file `.env` o nei file di configurazione Docker se presenti.*

---

## 🖼️ Come Funziona (Galleria Illustrativa)

### 1. Dashboard Principale
L'utente inserisce il testo o il prompt di test e seleziona i criteri di validazione desiderati.
> ![Dashboard Principale](assets/screenshot-dashboard.png)

### 2. Risultati e Validazione
Il sistema interroga l'LLM e mostra in tempo reale l'esito della validazione (es. metriche di successo, errori riscontrati, latenza).
> ![Schermata Validazione](assets/screenshot-validation.png)

---

## 🚀 Guida Rapida all'Avvio

1. **Clona il repository:**
   ```bash
   git clone [https://github.com/federicoloria170/llm-validator-app.git](https://github.com/federicoloria170/llm-validator-app.git)
   cd llm-validator-app
