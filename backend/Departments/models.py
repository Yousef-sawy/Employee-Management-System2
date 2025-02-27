from django.db import models
from Company.models import Company
from django.core.exceptions import ValidationError

class Department(models.Model):
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    class Meta:
        unique_together = ('company', 'name')  

    def __str__(self):
        return f"{self.name} ({self.company.name})"

    @property
    def num_employees(self):
        return self.employees.count()

    def clean(self):
        """Custom validation to ensure uniqueness at the database level."""
        if Department.objects.filter(company=self.company, name=self.name).exclude(id=self.id).exists():
            raise ValidationError(f"A department named '{self.name}' already exists in {self.company.name}.")
    
    def save(self, *args, **kwargs):
        self.clean()  
        super().save(*args, **kwargs)
