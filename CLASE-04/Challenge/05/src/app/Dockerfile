FROM python:3.10.11-alpine
WORKDIR /app
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --requirement requirements.txt
COPY . /app
EXPOSE 8000

CMD [ "python", "app.py" ]