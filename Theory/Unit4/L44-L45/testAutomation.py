import os

import requests

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:8000").rstrip("/")

testcases = [
    ("/add/2/2", 4, "addition of 2 and 2"),
    ("/subtract/2/2", 0, "subtraction of 2 from 2"),
    ("/multiply/2/2", 4, "multiplication of 2 and 2"),
]


def run_tests():
    for path, expected, description in testcases:
        response = requests.get(BASE_URL + path, timeout=5)
        assert response.status_code == 200, f"{description}: HTTP {response.status_code}"
        assert response.json() == {"result": expected}, f"Failed: {description}"
        print(f"Test passed: {description}")
    print("All 3 Requests tests passed!")


if __name__ == "__main__":
    run_tests()
