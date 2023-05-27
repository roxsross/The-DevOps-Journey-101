FROM python:3.10.11-alpine
WORKDIR /consumer

RUN pip install --upgrade pip
RUN pip install requests
COPY . .

CMD [ "python", "consumer.py" ]