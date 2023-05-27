#!/bin/bash
# Download mongodb
docker pull mongo:4.2.24
# Download python
docker pull python:3.7.16-alpine
# Run mongodb
docker run -d -p 27017:27017 --name challenge02-db mongo:4.2.24
# Run python
pip install pymongo
python populate.py
python find.py
docker stop mongo:4.2.24
docker rm mongo:4.2.24