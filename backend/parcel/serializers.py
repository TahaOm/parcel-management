from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Plot


class PlotSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Plot
        geo_field = 'geofence'
        fields = ('__all__')
