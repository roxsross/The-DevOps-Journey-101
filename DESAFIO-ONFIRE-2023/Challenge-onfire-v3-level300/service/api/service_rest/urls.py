from django.urls import path

from .views import (
    api_appointments, api_technicians, api_appointment
)

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path(
        "appointments/",
        api_appointments,
        name="api_appointments",
    ),
    path(
        "appointments/<int:pk>/",
        api_appointment,
        name="api_appointment",

    )
]
