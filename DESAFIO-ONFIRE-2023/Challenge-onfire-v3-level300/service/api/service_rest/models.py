from django.db import models


# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveBigIntegerField()


class Appointment(models.Model):
    vehicle_owner = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, unique=True)
    is_vip = models.BooleanField(default=False, null=True)
    completed = models.BooleanField(default=False, null=True)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def compare_vins(self):
        vin_vo = AutomobileVO.objects.filter(vin=self.vin)
        if len(vin_vo) > 0:
            self.is_vip = True
        self.save()
