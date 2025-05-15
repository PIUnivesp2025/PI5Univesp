from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),

    # API routes
    path("loadOn", views.loadOn, name="loadOn"),
    path("loadOff", views.loadOff, name="loadOff"),
    path("presence", views.presence, name="presence")
]