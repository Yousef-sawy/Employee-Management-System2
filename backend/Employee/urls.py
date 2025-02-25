from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)  # /api/employees/

urlpatterns = router.urls
