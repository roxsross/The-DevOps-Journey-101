from common.json import ModelEncoder

from .models import Technician, AutomobileVO, Appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "id"]


class AutomobileVOVinEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "id"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vehicle_owner",
        "date_time",
        "reason",
        "vin",
        "id",
        "technician",
        "is_vip",
        "completed",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        "automobile": AutomobileVOVinEncoder(),
    }
