FROM python:3.10.11-alpine
WORKDIR /consumer
COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir --requirement requirements.txt
COPY . /consumer

CMD [ "python", "consumer.py" ]