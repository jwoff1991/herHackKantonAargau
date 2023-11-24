from rest_framework import viewsets
from .serializers import CompanySerializer
from .models import Company
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def create(self, request):
        permission_classes = [IsAuthenticated]
        user = request.user

        data={
            'name': request.data.get('name'),
            'address': request.data.get('address'),
            'contact_number': request.data.get('contact_number'),
            'admin': user.id
            }

        serializer = CompanySerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
