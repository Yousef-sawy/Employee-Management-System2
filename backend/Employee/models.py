from django.db import models
from Company.models import Company
from Departments.models import Department
from Users.models import User  # Import only the correct User model
from datetime import date

class Employee(models.Model):
    EMPLOYEE_STATUS_CHOICES = [
        ('applied', 'Application Received'),
        ('interview', 'Interview Scheduled'),
        ('hired', 'Hired'),
        ('rejected', 'Not Accepted'),
    ]

    company = models.ForeignKey(
        Company, related_name='employees', on_delete=models.CASCADE
    )
    department = models.ForeignKey(
        Department, related_name='employees', on_delete=models.CASCADE
    )
    user = models.OneToOneField(
        User, related_name='employee_profile', on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=20, choices=EMPLOYEE_STATUS_CHOICES, default='applied'
    )
    mobile = models.CharField(max_length=20)
    address = models.TextField()
    designation = models.CharField(max_length=255)
    hired_on = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-set on creation
    updated_at = models.DateTimeField(auto_now=True)      # Auto-updated on save

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.designation}"

    @property
    def days_employed(self):
        if self.hired_on:
            return (date.today() - self.hired_on).days
        return None
