from core.models import BookingRequest


def booking_badge_callback(request):
    """Returns the count of pending bookings as a badge for the sidebar."""
    count = BookingRequest.objects.filter(status='pending').count()
    if count > 0:
        return str(count)
    return None


def environment_callback(request):
    """Returns the environment label shown in the admin header."""
    return "Development"
