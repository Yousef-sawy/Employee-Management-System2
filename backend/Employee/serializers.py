from rest_framework import serializers
from Users.models import User
from .models import Employee
from Company.models import Company
from Departments.models import Department

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", source="user", required=False, allow_null=True
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, required=False, allow_null=True
    )  # Accept user ID in input
    email = serializers.EmailField(source="user.email", read_only=True)
    position_title = serializers.CharField(source="designation", required=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=True)
    company_name = serializers.CharField(source="company.name", read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=True)
    department_name = serializers.CharField(source="department.name", read_only=True)
    mobile = serializers.CharField(required=True)
    address = serializers.CharField(required=True, allow_blank=True)
    hired_on = serializers.DateField(required=False, allow_null=True)

    class Meta:
        model = Employee
        fields = [
            "id", "username", "user_id", "email", "company", "company_name",
            "department", "department_name", "status", "mobile",
            "address", "position_title", "hired_on", "days_employed"
        ]

    def create(self, validated_data):
        """Create Employee and link to a User (if provided)."""
        user = validated_data.pop("user_id", None)  

        if user and Employee.objects.filter(user=user).exists():
            raise serializers.ValidationError({"user_id": "An employee for this user already exists."})

        return Employee.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        """Update Employee and ensure user linking is handled properly."""
        user = validated_data.pop("user_id", None)

        if user:
            if Employee.objects.filter(user=user).exclude(id=instance.id).exists():
                raise serializers.ValidationError({"user_id": "This user is already assigned to another employee."})
            instance.user = user

        return super().update(instance, validated_data)
