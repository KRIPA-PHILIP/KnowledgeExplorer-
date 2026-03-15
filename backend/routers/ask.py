from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from routers.articles import load_articles
from services.ai_service import ask_about_article

router = APIRouter(tags=["ask"])


class AskRequest(BaseModel):
    article_id: int
    question: str


class AskResponse(BaseModel):
    answer: str


@router.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    """Ask an AI question about a specific article."""
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    articles = load_articles()
    article = next((a for a in articles if a.id == request.article_id), None)
    if not article:
        raise HTTPException(
            status_code=404, detail=f"Article {request.article_id} not found"
        )

    try:
        answer = ask_about_article(article.title, article.content, request.question)
        return AskResponse(answer=answer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI service error: {str(e)}. Ensure your API key is set correctly.",
        )
