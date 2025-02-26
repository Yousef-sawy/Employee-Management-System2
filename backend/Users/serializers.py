from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}  # ✅ Password is now optional
        }

    def create(self, validated_data):
        """Create user with hashed password"""
        validated_data['password'] = make_password(validated_data.get('password'))
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update user, but only set password if provided"""
        password = validated_data.pop('password', None)  # ✅ Remove password if not provided
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:  # ✅ Only update password if provided
            instance.set_password(password)

        instance.save()
        return instance

    def validate_email(self, value):
        """Ensure email is unique only when creating a user"""
        if self.instance is None and User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value
