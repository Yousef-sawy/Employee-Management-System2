from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from django.contrib.auth.models import User
from .serializers import UserSerializer

class IsAdminUser(BasePermission):
    """Allow access only to superusers."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['list', 'destroy']:  # Only superusers can view or delete users
            permission_classes = [IsAdminUser]
        elif self.action == 'create':  # Anyone can register
            permission_classes = [AllowAny]
        else:  # Default: Only authenticated users can update themselves
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
