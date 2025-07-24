# Fast Crawler

This project is a web crawler that retrieves and processes links from a specified website. The crawler is designed to extract links that exist within the same domain, ensuring that the crawling process remains focused and efficient.

## Project Structure

```
fast-crawler
├── src
│   ├── main.py          # Entry point of the application
│   ├── crawler.py       # Contains the Crawler class for web crawling
│   └── utils.py         # Utility functions for URL validation and HTML parsing
├── requirements.txt     # Lists project dependencies
└── README.md            # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To start the crawler, run the following command:

```
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```
and
```
npm start
```


## Main Components

- **Crawler**: The `Crawler` class in `src/crawler.py` is responsible for initiating the crawling process and retrieving links from the specified URL.

- **Utilities**: The `utils.py` file provides helper functions, such as checking if two URLs belong to the same domain.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.