from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

# parcels app
from .models import Operatings, Parcels
from .serializers import OperatingSerializer, ParcelSerializer


@csrf_exempt
def OperatingApi(request, id=0):
    if request.method == 'GET':
        operatings = Operatings.objects.all()
        operatings_serializer = OperatingSerializer(operatings, many=True)
        return JsonResponse(operatings_serializer.data, safe=False)

    elif request.method == 'POST':
        operating_data = JSONParser().parse(request)
        operating_serializer = OperatingSerializer(data=operating_data)
        if operating_serializer.is_valid():
            operating_serializer.save()
            return JsonResponse('Added successfully!!', safe=False)
        return JsonResponse('failed to add.', safe=False)

    elif request.method == 'PUT':
        operating_data = JSONParser().parse(request)
        operating = Operatings.objects.get(
            OperatingId=operating_data['OperatingId'])
        operating_serializer = OperatingSerializer(
            operating, data=operating_data)
        if operating_serializer.is_valid():
            operating_serializer.save()
            return JsonResponse('update successfully!!', safe=False)
        return JsonResponse('failed to update.', safe=False)

    elif request.method == 'DELETE':
        operating = Operatings.objects.get(OperatingId=id)
        operating.delete()
        return JsonResponse('deleted successfully!!', safe=False)


@csrf_exempt
def ParcelApi(request, id=0):
    if request.method == 'GET':
        parcels = Parcels.objects.all()
        parcels_serializer = ParcelSerializer(parcels, many=True)
        return JsonResponse(parcels_serializer.data, safe=False)

    elif request.method == 'POST':
        parcel_data = JSONParser().parse(request)
        parcel_serializer = ParcelSerializer(data=parcel_data)
        if parcel_serializer.is_valid():
            parcel_serializer.save()
            return JsonResponse('Added successfully!!', safe=False)
        return JsonResponse('failed to add.', safe=False)

    elif request.method == 'PUT':
        parcel_data = JSONParser().parse(request)
        parcel = Parcels.objects.get(
            ParcelId=parcel_data['ParcelId'])
        parcel_serializer = ParcelSerializer(
            parcel, data=parcel_data)
        if parcel_serializer.is_valid():
            parcel_serializer.save()
            return JsonResponse('update successfully!!', safe=False)
        return JsonResponse('failed to update.', safe=False)

    elif request.method == 'DELETE':
        parcel = Parcels.objects.get(ParcelId=id)
        parcel.delete()
        return JsonResponse('deleted successfully!!', safe=False)


# @csrf_exempt
