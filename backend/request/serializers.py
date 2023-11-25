from rest_framework import serializers
from .models import Request, Request_item

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'


class RequestItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request_item
        fields = '__all__'
