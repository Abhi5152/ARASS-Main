from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    deadline = models.DateField(null=True, blank=True, help_text="Overall deadline for this client's work")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('INTERNAL', 'Internal Project'),
        ('CLIENT', 'Client Work'),
    ]
    STATUS_CHOICES = [
        ('PLANNING', 'Planning'),
        ('IN_PROGRESS', 'In Progress'),
        ('REVIEW', 'Review'),
        ('COMPLETED', 'Completed'),
        ('ON_HOLD', 'On Hold'),
    ]

    title = models.CharField(max_length=200)
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES, default='CLIENT')
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PLANNING')
    progress = models.IntegerField(default=0, help_text="Progress percentage 0-100")
    deadline = models.DateField(null=True, blank=True, help_text="Project deadline")
    pricing = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Total project price")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    is_completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    pricing = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Cost for this task")
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

class WorkLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='work_logs')
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True, blank=True, related_name='logs')
    date = models.DateField()
    hours_spent = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.hours_spent}h"

class CompanyDocument(models.Model):
    CATEGORY_CHOICES = [
        ('LEGAL', 'Legal'),
        ('FINANCIAL', 'Financial'),
        ('HR', 'Human Resources'),
        ('TECHNICAL', 'Technical'),
        ('OTHER', 'Other'),
    ]
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='OTHER')
    file = models.FileField(upload_to='company_documents/')
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
