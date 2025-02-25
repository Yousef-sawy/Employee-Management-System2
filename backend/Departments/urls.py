from rest_framework.routers import DefaultRouter
from .views import DepartmentViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)  # /api/departments/

urlpatterns = router.urls
