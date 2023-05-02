#!/usr/bin/python
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import requests
import os 
import uvicorn
app = FastAPI()

app.add_middleware(

    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pokemons = list(map(lambda x: x.lower(),["SPEAROW", "FEAROW", "EKANS", "ARBOK", "PIKACHU",
"RAICHU", "SANDSHREW", "SANDSLASH", "NIDORINA"]))



@app.get("/")
async def root( ):
    return {"message":"Bienvenido a POKE-API construida en FASTAPI"}


@app.get("/api/v1/all_pokemons")
async def all_pokemons( response: Response):
    results = []
    try:
        for pokemon in pokemons:
            response_pokemon = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemon}")
            response_description = requests.get(f"https://pokeapi.co/api/v2/pokemon-species/{pokemon}")
            if response_pokemon.status_code ==200:
                response.status_code==200
                description_pokemon = response_description.json()["flavor_text_entries"][0]["flavor_text"]
                data_final  = {"name":response_pokemon.json()["name"],
                               "sprites":{
                                   "front_default":response_pokemon.json()["sprites"]["front_default"],
                                   "back_default":response_pokemon.json()["sprites"]["back_default"],
                                   }}
                data_final["description"] = description_pokemon
                results.append(data_final)
        return {"results":results}
    except Exception:
        response.status_code==500
        return {"message":"Error interno en el servidor"}
    


@app.get("/api/v1/names_abilities/{pokemon}")
async def names_abilities(pokemon: str, response: Response):
    results=[]
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon}"
    try:
        data = requests.get(url)
        if data.status_code==200:
            response.status_code = 200
            for result in data.json()["abilities"]:
                results.append(result["ability"]["name"])
            
            return {"results":results}
        if data.status_code == 404:
            response.status_code = 404
            return {"message":"el pokemon solicitado no existe"}
        else:
            response.status_code = 500
            return {"message":"servidor no disponible en este momento"}
    except Exception as e:
        print(e)

if __name__=="__main__":
    port = int(os.getenv("PORT") or 8000)
    uvicorn.run("main:app",host='0.0.0.0',port=port ,reload=True)