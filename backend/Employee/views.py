from rest_framework.viewsets import ModelViewSet
from .models import Employee
from .serializers import EmployeeSerializer

from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class EmployeeViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Employee.objects.select_related('company', 'department', 'user').all()
    serializer_class = EmployeeSerializer