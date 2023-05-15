from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile


admin.site.register(Automobile)
admin.site.register(Manufacturer)
admin.site.register(VehicleModel)
