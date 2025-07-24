# LM Studio Qwen Crawler

This project is a web crawler that utilizes the Qwen 3.8b model to retrieve and process links from a specified website. The crawler is designed to extract links that exist within the same domain, ensuring that the crawling process remains focused and efficient.

## Project Structure

```
lmstudio-qwen-crawler
├── src
│   ├── main.py          # Entry point of the application
│   ├── crawler.py       # Contains the Crawler class for web crawling
│   ├── qwen_integration.py # Handles interaction with the Qwen model
│   └── utils.py         # Utility functions for URL validation and HTML parsing
├── requirements.txt     # Lists project dependencies
└── README.md            # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd lmstudio-qwen-crawler
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To start the crawler, run the following command:

```
python src/main.py <url>
```

Replace `<url>` with the website you want to crawl.

## Main Components

- **Crawler**: The `Crawler` class in `src/crawler.py` is responsible for initiating the crawling process and retrieving links from the specified URL.

- **Qwen Integration**: The `QwenIntegration` class in `src/qwen_integration.py` manages the communication with the Qwen 3.8b model, allowing for enhanced processing of the crawled data.

- **Utilities**: The `utils.py` file provides helper functions, such as checking if two URLs belong to the same domain.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.