from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),

    # API routes
    path("ledOn", views.ledOn, name="ledOn"),
    path("ledOff", views.ledOff, name="ledOff"),
    path("pot", views.potenciometer, name="pot")
]