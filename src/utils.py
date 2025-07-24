def is_same_domain(url1, url2):
    from urllib.parse import urlparse

    domain1 = urlparse(url1).netloc
    domain2 = urlparse(url2).netloc

    return domain1 == domain2

def validate_url(url):
    from urllib.parse import urlparse

    parsed = urlparse(url)
    return all([parsed.scheme, parsed.netloc])

def parse_html(content):
    from bs4 import BeautifulSoup

    soup = BeautifulSoup(content, 'html.parser')
    return soup.find_all('a', href=True)