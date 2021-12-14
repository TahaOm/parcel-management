from django.db import models

# Create your models here.


class Operatings(models.Model):
    OperatingId = models.AutoField(primary_key=True)
    OperatingName = models.CharField(max_length=100)


class Parcels(models.Model):
    ParcelId = models.AutoField(primary_key=True)
    ParcelName = models.CharField(max_length=100)
    ParcelSurface = models.CharField(max_length=100)
    OperatingName = models.ForeignKey(Operatings, on_delete=models.CASCADE)
    PhotoFileName = models.CharField(max_length=100)
