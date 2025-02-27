from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from .models import User
from .serializers import UserSerializer

class IsAdminUser(BasePermission):
    """Allow access only to superusers."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """Define permissions based on the action"""
        if self.action == 'list':  
            permission_classes = [AllowAny]  # Anyone can view users
        elif self.action == 'destroy':  
            permission_classes = [IsAdminUser]  # Only admins can delete users
        elif self.action in ['update', 'partial_update']:  
            permission_classes = [AllowAny]  # Only authenticated users can update themselves
        else:  
            permission_classes = [AllowAny]  # Allow registration
        return [permission() for permission in permission_classes]
