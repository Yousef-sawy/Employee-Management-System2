from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from .serializers import UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Default permission is AllowAny (as you had it)
    # permission_classes = [AllowAny]
    
    # Override get_permissions to require authentication for all methods except create
    def get_permissions(self):
        if self.action == 'create':
            # Allow anyone to create a user (register)
            permission_classes = [AllowAny]
        else:
            # Require authentication for all other actions (list, retrieve, update, delete)
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]