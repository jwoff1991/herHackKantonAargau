
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from user.views import (
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogOutAPIView,
    RegisterView,
)
from user.views import UserViewSet
from company.views import CompanyViewSet
from plastic.views import PlasticViewSet, PlasticStockViewSet
from request.views import RequestViewSet, RequestItemViewSet

router = DefaultRouter()
router.register("api/users", UserViewSet, basename="user")
router.register("api/companies", CompanyViewSet, basename="company")
router.register("api/plastic", PlasticViewSet, basename="plastic")
router.register("api/plastic_stock", PlasticStockViewSet, basename="plastic_stock")
router.register("api/requests", RequestViewSet, basename="request")
router.register("api/requests_items", RequestItemViewSet, basename="request_item")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
    path("api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", LogOutAPIView.as_view(), name="logout"),
    path("api/register/", RegisterView.as_view(), name="register"),
] + router.urls
