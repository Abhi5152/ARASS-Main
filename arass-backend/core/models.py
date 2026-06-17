from django.db import models
from solo.models import SingletonModel

class SiteSettings(SingletonModel):
    site_name = models.CharField(max_length=100, default='ARASS Tech')
    tagline = models.CharField(max_length=200, blank=True)
    contact_email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return "Site Settings"

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

class Template(models.Model):
    CATEGORY_CHOICES = [
        ('ecommerce', 'E-Commerce'),
        ('corporate', 'Corporate'),
        ('portfolio', 'Portfolio'),
        ('medical', 'Medical'),
        ('realestate', 'Real Estate'),
        ('restaurant', 'Restaurant'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    thumbnail_image = models.ImageField(upload_to='templates/thumbnails/')
    live_preview_url = models.URLField()
    features = models.JSONField(default=list, blank=True, help_text='List of strings, e.g. ["Next.js", "Stripe", "Dark Mode"]')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
        
    class Meta:
        ordering = ['-created_at']

class PortfolioProject(models.Model):
    CATEGORY_CHOICES = [
        ('ai', 'AI Projects'),
        ('web', 'Web Apps'),
        ('startup', 'Startups'),
        ('research', 'Research'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='web')
    sub = models.CharField(max_length=200, blank=True, help_text="Subtitle or short description")
    description = models.TextField(blank=True, help_text="General description (optional if problem/solution are used)")
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    impact = models.TextField(blank=True)
    stack = models.JSONField(default=list, blank=True, help_text='List of strings, e.g. ["React", "Next.js", "AWS"]')
    thumbnail = models.ImageField(upload_to='portfolio/thumbnails/')
    project_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

class BookingRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('contacted', 'Contacted'),
        ('closed', 'Closed'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    service = models.CharField(max_length=100)
    package_tier = models.CharField(max_length=50)
    target_date = models.DateTimeField()
    details = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Booking from {self.name} - {self.service}"

    class Meta:
        ordering = ['-created_at']
