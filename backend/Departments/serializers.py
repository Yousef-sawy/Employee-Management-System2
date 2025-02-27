from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = ['id', 'company', 'company_name', 'name', 'num_employees']

    def get_company_name(self, obj):
        return obj.company.name  
