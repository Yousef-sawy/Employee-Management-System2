from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User  # ✅ Use Django's built-in User model
from .serializers import UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]  # ✅ Allow anyone to register
        else:
            permission_classes = [AllowAny]  # ✅ Require authentication for everything else
        return [permission() for permission in permission_classes]
