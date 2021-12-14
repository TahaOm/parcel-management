from django.urls import path
from . import views

urlpatterns = [
    # operating
    path(r'operating/', views.OperatingApi),
    path(r'operating/<int:id>', views.OperatingApi),
    # parcel
    path(r'parcel/', views.ParcelApi),
    path(r'parcel/<int:id>', views.ParcelApi),
]
