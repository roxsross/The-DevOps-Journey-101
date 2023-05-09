import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["mi-db"]

# Obtén un registro
print("Imprime un registro\n", db.pet.find_one(), "\n")

# Obtén todos los registros
print("Imprime todos los registros")
for pet in db.pet.find():
    print(pet)