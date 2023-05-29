FROM python:rc-buster
COPY app /usr/share/app
WORKDIR /usr/share/app
RUN pip install --no-cache-dir -r requirements.txt
ENV REDIS_SERVER redis
CMD [ "python3", "app.py"]