from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=25, unique=True, null=True)

class SalesPerson(models.Model):
    employee_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=15, unique=True)


class SalesRecord(models.Model):
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_person",
        on_delete=models.PROTECT,
    )
    sales_customer = models.ForeignKey(
        Customer,
        related_name="sales_customer",
        on_delete=models.PROTECT,
    )
    sales_automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_auto",
        on_delete=models.PROTECT,
    )

    price = models.PositiveBigIntegerField()
