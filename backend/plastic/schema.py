from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializers import PlasticStockSerializer

plasitc_list_docs = extend_schema(
    responses = PlasticStockSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name='company_id',
            description='Company id',
            required=False,
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
        ),
    ],
)
