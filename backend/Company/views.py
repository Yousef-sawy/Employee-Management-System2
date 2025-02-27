from rest_framework.viewsets import ModelViewSet
from .models import Company
from .serializers import CompanySerializer
from django.db.models import Count

from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CompanyViewSet(ModelViewSet):
    permission_classes =(IsAuthenticated,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
    
    def perform_update(self, serializer):
        instance = serializer.save()
        instance.update_counts()
