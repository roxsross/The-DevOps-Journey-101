FROM python:3.10.11-alpine
WORKDIR /app
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --requirement requirements.txt
COPY . /app

CMD [ "python", "app.py" ]