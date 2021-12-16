from rest_framework import generics, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from .models import Plot
from .serializers import PlotSerializer
from rest_framework_gis.pagination import GeoJsonPagination


class CreatePlotView(generics.CreateAPIView):
    queryset = Plot.objects.all()
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = PlotSerializer

    def post(self, request, format=None):
        serializer = PlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# * Retrieve Plot Api View
class RetrievePlotView(generics.RetrieveAPIView):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer


# * List Plot Api View
class ListPlotView(generics.ListAPIView):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer
    pagination_class = GeoJsonPagination
