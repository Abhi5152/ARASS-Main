from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Template, BlogPost, PortfolioProject, BookingRequest, SiteSettings
from .serializers import (
    TemplateSerializer, BlogPostSerializer, 
    PortfolioProjectSerializer, BookingRequestSerializer, SiteSettingsSerializer
)

class TemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Template.objects.filter(is_active=True)
    serializer_class = TemplateSerializer
    lookup_field = 'slug'

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(status='published')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

class PortfolioProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectSerializer
    lookup_field = 'slug'

class BookingRequestViewSet(viewsets.ModelViewSet):
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    # In production, we should restrict this to POST only for public access

class SiteSettingsView(APIView):
    def get(self, request, *args, **kwargs):
        settings = SiteSettings.get_solo()
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)
