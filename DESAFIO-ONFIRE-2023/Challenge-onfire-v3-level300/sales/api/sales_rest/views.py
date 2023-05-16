from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href"

    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "employee_id",
        "name",
        "id"
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "phone",
        "address",
        "name",
        "id"
    ]
class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "phone",
        "name"
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "price",
        "id"
    ]

    def get_extra_data(self, o):
        return {
            "sales_customer": o.sales_customer.name,
            "sales_person_id": o.sales_person.employee_id,
            "sales_automobile": o.sales_automobile.vin,
            "sales_person_name": o.sales_person.name
            }


@require_http_methods(["GET", "POST"])
def api_list_sales_person(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,)
    else:
        content = json.loads(request.body)
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_sales_customers(request):
    if request.method == "GET":
        sales_customers = Customer.objects.all()
        return JsonResponse(
            {"sales_customers": sales_customers},
            encoder=CustomerListEncoder
        )
    else:
        content = json.loads(request.body)
        sales_customer = Customer.objects.create(**content)
        return JsonResponse(
            sales_customer,
            encoder=CustomerDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_sale_records(request):
    if request.method == "GET":
        sale_records = SalesRecord.objects.all()
        return JsonResponse(
            {"sale_records": sale_records},
            encoder=SalesRecordEncoder,
            safe=False
        )

    else:
        content = json.loads(request.body)
        try:
            auto_vin = content["sales_automobile"]
            sales_automobile = AutomobileVO.objects.get(vin=auto_vin)
            content["sales_automobile"] = sales_automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400
            )
        try:
            rep_employee_id = content["sales_person"]
            sales_person = SalesPerson.objects.get(employee_id=rep_employee_id)
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Sales Person"},
                status=400
            )
        try:
            sales_customer_phone = content["sales_customer"]
            sales_customer = Customer.objects.get(phone=sales_customer_phone)
            content["sales_customer"] = sales_customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer phone number"},
                status=400
            )

        sale_record = SalesRecord.objects.create(**content)
        return JsonResponse(
            sale_record,
            encoder=SalesRecordEncoder,
            safe=False
        )
