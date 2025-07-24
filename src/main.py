from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crawler import Crawler
from qwen_integration import QwenIntegration

app = FastAPI()

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CrawlRequest(BaseModel):
    url: str

@app.post("/crawl")
async def crawl_and_summarize(data: CrawlRequest):
    print(f"Received crawl request for: {data.url}")
    crawler = Crawler()
    try:
        crawler.start_crawl(data.url)
        links = crawler.get_links()
        print(f"Links found: {links}")
        if not links:
            return {"links": []}
        return {"links": links}
    except Exception as e:
        print(f"Error in /crawl: {e}")
        return {"links": [], "error": str(e)}