Knowledge Explorer — AI-Powered Sports Knowledge Base

A full-stack AI-powered web application that lets users browse sports articles and ask questions about them using an AI assistant.

Tech Stack

Frontend -React 18, Vite, React Router, Tailwind CSS 
Backend -FastAPI, Python 3.9+, Uvicorn 
AI -LangChain + Groq (llama-3.3-70b-versatile) 

Project Structure

backend
── main.py               # FastAPI app entry point
── articles.json         # Article data store (6 sports articles)
── requirements.txt      # Python dependencies
── routers
   -articles.py       # GET /articles, GET /articles/{id}
   -ask.py            # POST /ask
── services
   -ai_service.py     # LangChain + Groq AI integration

frontend
── index.html
── vite.config.js
── package.json
── src
  -App.jsx            # Root component with routing
  -main.jsx           # React entry point
  -index.css          # Global styles + Tailwind
 ─ api
    -client.js      # API client (fetch wrapper)
 ─ components
    -Header.jsx     # Top navigation bar
 ─ pages
    -ArticleListPage.jsx    # All articles grid
    -ArticleDetailPage.jsx  # Article + AI chat panel

Setup Instructions

- Python 3.9+
- Node.js 18 or higher
- A Groq API key 

Running the Backend

-Open a terminal and run:
cd backend
-Create and activate a virtual environment:
python -m venv venv
venv\Scripts\activate
-Install dependencies:
pip install -r requirements.txt
-Add your Groq API key in `backend/services/ai_service.py`:
python
os.environ["GROQ_API_KEY"] = "your-groq-api-key-here"
-Start the backend server:
uvicorn main:app --reload --port 8000

-Backend runs at: **http://localhost:8000**
-API docs available at: **http://localhost:8000/docs**

Running the Frontend

-Open a second terminal and run:
cd frontend
npm install
npm run dev

-Frontend runs at: **http://localhost:5173**

API Reference

GET `/articles`- Returns all articles 
GET `/articles/{id}`- Returns a single article by ID 
POST `/ask`- Ask a question about an article 

Articles Included

1. The History of Football (Soccer) 
2. Basketball: From Peach Baskets to the NBA
3. The Science of Running: Marathon Training 
4. Tennis: Grand Slams and the GOAT Debate 
5. The Olympics: A History of the World's Greatest Sporting Event
6.|Cricket: The Gentleman's Game


Features Implemented

- Browse all articles on the home page
- View full article content on detail page
- AI chat panel — ask questions about the article
- AI answers based only on article content




