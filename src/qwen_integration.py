import requests

class QwenIntegration:
    def __init__(self, model, api_url="http://172.16.161.81:8087/v1/chat/completions"):
        self.model = model
        self.api_url = api_url

    def generate_response(self, prompt):
        payload = {
            "model": self.model,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        print("Payload:", payload)  # Add this line
        response = requests.post(self.api_url, json=payload)
        response.raise_for_status()
        data = response.json()
        print("API raw response:", data)
        try:
            return data["choices"][0]["message"]["content"]
        except (KeyError, IndexError):
            return f"Unexpected response format: {data}"