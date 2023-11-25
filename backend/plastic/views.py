from rest_framework import viewsets
from .models import Plastic, Plastic_stock
from .serializers import PlasticSerializer, PlasticStockSerializer
# from .schema import plasitc_list_docs


class PlasticViewSet(viewsets.ModelViewSet):
    serializer_class = PlasticSerializer
    queryset = Plastic.objects.all()

class PlasticStockViewSet(viewsets.ModelViewSet):
    serializer_class = PlasticStockSerializer
    queryset = Plastic_stock.objects.all()

    # @plasitc_list_docs
    # def list(self, request):
    #     company_id = request.query_params.get('company_id', None)

    #     if company_id is not None:
    #         self.queryset = Plastic_stock.objects.filter(company=company_id)
    #     return self.queryset
