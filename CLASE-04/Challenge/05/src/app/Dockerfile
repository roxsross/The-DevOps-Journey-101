FROM python:3.10.11-alpine
WORKDIR /app

RUN pip install --upgrade pip
RUN pip install flask
COPY . .
EXPOSE 8000

CMD [ "python", "app.py" ]