from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},  # Password optional for updates
        }

    def create(self, validated_data):
        """Create user and hash password"""
        if 'password' not in validated_data:
            raise serializers.ValidationError({"password": "This field is required."})

        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """Update user and hash password if changed"""
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.password = make_password(password)

        instance.save()
        return instance

    def validate_email(self, value):
        """Ensure email is unique only when changing to a new one"""
        if self.instance:  # If updating
            if User.objects.exclude(id=self.instance.id).filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        else:  # If creating
            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")

        return value
