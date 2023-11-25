from rest_framework import viewsets
from .models import Request
from .serializers import RequestSerializer, RequestItemSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class RequestItemViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestItemSerializer
