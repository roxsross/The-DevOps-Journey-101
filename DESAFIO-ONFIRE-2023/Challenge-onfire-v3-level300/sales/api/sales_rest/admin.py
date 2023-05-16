from django.contrib import admin
from .models import Customer, SalesPerson, AutomobileVO, SalesRecord


admin.site.register(AutomobileVO)
admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(SalesRecord)
