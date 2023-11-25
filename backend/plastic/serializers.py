from rest_framework import serializers
from .models import Plastic_stock

class PlasticStockSerializer(serializers.ModelSerializer):
    plasticStock = serializers.CharField(source='plastic')

    class Meta:
        model = Plastic_stock
        fields = ['id', 'stock', 'plasticStock', 'company']
