from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crawler import Crawler

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
    max_depth: int = 2  # Add max_depth field with default

@app.post("/crawl")
async def crawl_and_summarize(data: CrawlRequest):
    print(f"Received crawl request for: {data.url} with max_depth={data.max_depth}")
    crawler = Crawler(max_depth=data.max_depth)  # Pass max_depth to Crawler
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