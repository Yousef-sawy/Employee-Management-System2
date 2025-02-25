from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('employee', 'Employee'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # ✅ Fix the conflict
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',  # ✅ Fix the conflict
        blank=True
    )

    def __str__(self):
        return self.username
