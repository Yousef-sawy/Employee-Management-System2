from rest_framework.viewsets import ModelViewSet
from .models import Company
from .serializers import CompanySerializer
from django.db.models import Count

class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()  # ✅ No need for annotation here
    serializer_class = CompanySerializer
    
    
    def perform_update(self, serializer):
        instance = serializer.save()
        instance.update_counts()
