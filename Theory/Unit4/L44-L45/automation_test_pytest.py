import os

import pytest
import requests

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:8000").rstrip("/")


@pytest.mark.parametrize("path, expected", [
    ("/add/2/2", 4),
    ("/subtract/2/2", 0),
    ("/multiply/2/2", 4),
    ("/add/-1/1", 0),
    ("/multiply/0/5", 0),
    ("/subtract/3/5", -2),
    ("/add/1000000/1000000", 2000000),
    ("/multiply/-2/3", -6),
])
def test_calculation(path, expected):
    response = requests.get(BASE_URL + path, timeout=5)
    assert response.status_code == 200
    assert response.json() == {"result": expected}


@pytest.mark.parametrize("operation", ["add", "subtract", "multiply"])
def test_invalid_input(operation):
    response = requests.get(f"{BASE_URL}/{operation}/abc/2", timeout=5)
    assert response.status_code == 422


def test_root():
    response = requests.get(BASE_URL + "/", timeout=5)
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}
