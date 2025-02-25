from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    @property
    def num_departments(self):
        return self.departments.count()

    @property
    def num_employees(self):
        return sum(dept.num_employees for dept in self.departments.all())
