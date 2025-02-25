from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)  # /api/companies/

urlpatterns = router.urls
