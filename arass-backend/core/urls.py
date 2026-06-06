from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TemplateViewSet, BlogPostViewSet, PortfolioProjectViewSet, BookingRequestViewSet, SiteSettingsView

router = DefaultRouter()
router.register(r'templates', TemplateViewSet)
router.register(r'blog', BlogPostViewSet)
router.register(r'portfolio', PortfolioProjectViewSet)
router.register(r'bookings', BookingRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
]
