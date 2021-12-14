from rest_framework import serializers
from .models import Operatings, Parcels


class OperatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operatings
        fields = ('OperatingId', 'OperatingName')


class ParcelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcels
        fields = ('ParcelId', 'ParcelName', 'ParcelSurface',
                  'OperatingName', 'PhotoFileName')
