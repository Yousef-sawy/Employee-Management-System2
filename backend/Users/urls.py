from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'users', UserViewSet)  # /api/users/

urlpatterns = router.urls


