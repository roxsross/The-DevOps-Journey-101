FROM python:3.10-bullseye
ENV PYTHONUNBUFFERED 1
WORKDIR /app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
CMD /wait && python manage.py migrate && python manage.py runserver "0.0.0.0:8000"
