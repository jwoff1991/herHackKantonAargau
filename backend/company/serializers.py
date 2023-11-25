from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    contactNumber = serializers.CharField(source='contact_number')
    class Meta:
        model = Company
        fields = ['name', 'address', 'contactNumber', 'admin']
