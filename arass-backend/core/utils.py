from core.models import BookingRequest, PortfolioProject
from operations.models import Client, WorkLog, Task

def booking_badge_callback(request):
    """Returns the count of pending bookings as a badge for the sidebar."""
    count = BookingRequest.objects.filter(status='pending').count()
    if count > 0:
        return str(count)
    return None

def environment_callback(request):
    """Returns the environment label shown in the admin header."""
    return "Production"

def dashboard_callback(request, context):
    """Injects custom metrics into the admin dashboard context."""
    context.update({
        "total_bookings": BookingRequest.objects.count(),
        "total_works": PortfolioProject.objects.count(),
        "total_clients": Client.objects.count(),
        "pending_tasks": Task.objects.filter(is_completed=False).count(),
        "recent_logs": WorkLog.objects.select_related('user', 'task').order_by('-created_at')[:5],
    })
    return context
