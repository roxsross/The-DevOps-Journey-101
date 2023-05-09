import os
from time import sleep

import requests
from requests.exceptions import Timeout


def main():
    if os.getenv("LOCAL"):
        print("Run container on local")
        url = "http://service-flask-app:8000"
    else:
        print("Run container on dev env")
        url = "http://service-flask-app"
    while True:
        try:
            responde = requests.get(url, timeout=5)
            if responde.ok:
                print("Response OK!!!")
            else:
                print(f"Requests FAIL, http error code: {responde.status_code}")
        except Timeout:
            print(f"Timeout error on url: {url}")
        except Exception as error:
            print(error)

        sleep(0.2)


if __name__ == '__main__':
    main()
