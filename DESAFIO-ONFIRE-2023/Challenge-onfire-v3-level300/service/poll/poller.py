import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO


def get_vins():
    url = "http://inventory-api:8000/api/automobiles"
    response = requests.get(url)
    content = json.loads(response.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=automobile["vin"],
            defaults={
                "color": automobile["color"],
                "vin": automobile["vin"],
                "year": automobile["year"],
            }
        )
# Import models from service_rest, here.
# from service_rest.models import Something

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_vins()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
