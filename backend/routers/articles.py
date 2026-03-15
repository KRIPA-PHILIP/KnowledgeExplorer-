import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/articles", tags=["articles"])

ARTICLES_FILE = Path(__file__).parent.parent / "articles.json"


class Article(BaseModel):
    id: int
    title: str
    content: str


def load_articles() -> list[Article]:
    with open(ARTICLES_FILE) as f:
        data = json.load(f)
    return [Article(**item) for item in data]


@router.get("", response_model=list[Article])
def get_articles():
    """Return all articles."""
    return load_articles()


@router.get("/{article_id}", response_model=Article)
def get_article(article_id: int):
    """Return a single article by ID."""
    articles = load_articles()
    for article in articles:
        if article.id == article_id:
            return article
    raise HTTPException(status_code=404, detail=f"Article {article_id} not found")
