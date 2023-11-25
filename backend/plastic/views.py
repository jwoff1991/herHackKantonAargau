from rest_framework import viewsets
from .models import Plastic, Plastic_stock
from .serializers import PlasticSerializer, PlasticStockSerializer

class PlasticViewSet(viewsets.ModelViewSet):
    serializer_class = PlasticSerializer
    queryset = Plastic.objects.all()

class PlasticStockViewSet(viewsets.ModelViewSet):
    serializer_class = PlasticStockSerializer
    queryset = Plastic_stock.objects.all()
