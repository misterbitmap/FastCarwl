import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


class Crawler:
    def __init__(self):
        self.visited_links = set()
        self.links = []

    def start_crawl(self, url):
        self.visited_links.add(url)
        self.crawl(url)

    def crawl(self, url):
        page_content = self.fetch_page(url)
        found_links = self.get_links_from_content(page_content, url)

        for link in found_links:
            if link not in self.visited_links and self.is_same_domain(url, link):
                self.visited_links.add(link)
                self.links.append(link)
                # Optionally limit recursion depth here
                # self.crawl(link)

    def fetch_page(self, url):
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Failed to fetch {url}: {e}")
            return ""

    def get_links_from_content(self, content, base_url):
        soup = BeautifulSoup(content, "html.parser")
        links = []
        for a in soup.find_all("a", href=True):
            full_url = urljoin(base_url, a["href"])
            links.append(full_url)
        return links

    def is_same_domain(self, url1, url2):
        return urlparse(url1).netloc == urlparse(url2).netloc

    def get_links(self):
        return self.links