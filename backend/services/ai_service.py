import os
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage

os.environ["GROQ_API_KEY"] = "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"

def ask_about_article(article_title: str, article_content: str, question: str) -> str:
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.3)

    messages = [
        SystemMessage(content=(
            "You are a helpful assistant that answers questions strictly based on the "
            "provided article content. Do not use any outside knowledge. If the answer "
            "cannot be found in the article, say so clearly."
        )),
        HumanMessage(content=(
            f"Article Title: {article_title}\n\n"
            f"Article Content:\n{article_content}\n\n"
            f"---\n\n"
            f"Question: {question}\n\n"
            f"Answer based only on the article content above:"
        )),
    ]

    response = llm.invoke(messages)
    return response.content.strip()