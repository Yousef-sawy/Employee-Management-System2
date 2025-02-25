from rest_framework import serializers
from .models import Company
from Departments.models import Department  # Adjust this if needed

class CompanySerializer(serializers.ModelSerializer):
    num_departments = serializers.SerializerMethodField()  # ✅ Use SerializerMethodField

    class Meta:
        model = Company
        fields = '__all__'

    def get_num_departments(self, obj):
        return Department.objects.filter(company=obj).count()

    def validate_name(self, value):
        if Company.objects.filter(name=value).exists():
            raise serializers.ValidationError("A company with this name already exists.")
        return value
