from rest_framework import serializers
from .models import Employee
from Users.models import User
from Company.models import Company
from Departments.models import Department

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    position_title = serializers.CharField(source="designation", required=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), write_only=True, required=True)
    company_name = serializers.CharField(source="company.name", read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), write_only=True, required=True)
    department_name = serializers.CharField(source="department.name", read_only=True)
    mobile = serializers.CharField(required=True)
    address = serializers.CharField(required=True, allow_blank=True)
    hired_on = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = Employee
        fields = [
            'id', 'user_id', 'company', 'company_name',
            'department', 'department_name', 'status',
            'username', 'email', 'mobile', 'address',
            'position_title', 'hired_on', 'days_employed'
        ]
    
    def create(self, validated_data):
        user = validated_data.pop('user_id', None)
        if not user:
            raise serializers.ValidationError({"user_id": "This field is required."})
        if Employee.objects.filter(user=user).exists():
            raise serializers.ValidationError({"user_id": "An employee for this user already exists."})
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    def update(self, instance, validated_data):
        validated_data.pop('user_id', None)
        return super().update(instance, validated_data)
