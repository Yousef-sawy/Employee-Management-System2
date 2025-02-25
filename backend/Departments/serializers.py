from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'company', 'name', 'num_employees']

    def validate(self, data):
        """Check for duplicate department names in the same company."""
        company = data.get('company')
        name = data.get('name')

        if Department.objects.filter(company=company, name=name).exists():
            raise serializers.ValidationError({"name": f"A department named '{name}' already exists in this company."})

        return data
