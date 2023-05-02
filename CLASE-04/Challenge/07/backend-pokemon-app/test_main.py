from fastapi.testclient import TestClient
from .main import app


client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message":"Bienvenido a POKE-API construida en FASTAPI"}

def test_all_pokemons():
    response = client.get("/api/v1/all_pokemons")
    data = response.json()["results"]
    assert len(data) == 9
    assert len(data) > 0

def test_names_abilities():
    response = client.get("/api/v1/names_abilities/pikachu")
    response_error = client.get("/api/v1/names_abilities/rafaskjaf")
    data = response.json()["results"]
    assert len(data) > 0
    assert response_error.json() == {"message":"el pokemon solicitado no existe"}