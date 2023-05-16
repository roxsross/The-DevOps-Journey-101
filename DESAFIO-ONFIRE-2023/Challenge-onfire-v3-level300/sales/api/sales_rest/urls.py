from django.urls import path
from .views import api_list_sales_person, api_list_sales_customers, api_list_sale_records


urlpatterns = [
    path('salesreps/', api_list_sales_person, name="api_list_sales_reps"),
    path('salescustomers/', api_list_sales_customers,
         name="api_list_sales_customers"),
    path('salerecords/', api_list_sale_records, name="api_list_sale_records"),
    # path('salesreps/<int:employee_id>/salerecords/', api_list_sale_records, name="api_employee_sales_records")
]
