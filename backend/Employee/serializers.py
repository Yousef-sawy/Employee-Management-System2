from rest_framework import serializers
from .models import Employee
from Users.models import User  # Import User model

class EmployeeSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)  # Accept user_id

    class Meta:
        model = Employee
        fields = [
            'id', 'user_id', 'company', 'department', 'status', 
            'first_name', 'last_name', 'email', 'mobile', 
            'address', 'designation', 'hired_on', 'days_employed'
        ]

    def create(self, validated_data):
        user = validated_data.pop('user_id', None)  # Get user from request
        if not user:
            raise serializers.ValidationError({"user_id": "This field is required."})
        employee = Employee.objects.create(user=user, **validated_data)
        return employee