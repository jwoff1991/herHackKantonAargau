from rest_framework import serializers
from .models import Plastic, Plastic_stock

class PlasticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plastic
        fields = '__all__'

class PlasticStockSerializer(serializers.ModelSerializer):
    plasticStock = serializers.CharField(source='plastic')

    class Meta:
        model = Plastic_stock
        fields = ['id', 'stock', 'plasticStock', 'company']
