from django.contrib import admin
from unfold.admin import ModelAdmin
from solo.admin import SingletonModelAdmin
from django.utils.html import format_html
from django.urls import reverse
from django.utils import timezone
from .models import SiteSettings, Template, BlogPost, PortfolioProject, BookingRequest
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.decorators import display

admin.site.unregister(User)
admin.site.unregister(Group)


# ─── User & Group Management ───────────────────────────────────────────

@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    list_display = ('username', 'email', 'first_name', 'last_name', 'show_staff_status', 'show_active_status', 'edit_button')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name')

    @display(description="Staff", label={"Yes": "success", "No": "info"})
    def show_staff_status(self, obj):
        return "Yes" if obj.is_staff else "No"

    @display(description="Active", label={"Active": "success", "Inactive": "danger"})
    def show_active_status(self, obj):
        return "Active" if obj.is_active else "Inactive"

    def edit_button(self, obj):
        url = reverse('admin:auth_user_change', args=[obj.id])
        return format_html('<a href="{}" class="edit-action-btn">✎ Edit</a>', url)
    edit_button.short_description = ''


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    list_display = ('name', 'edit_button')

    def edit_button(self, obj):
        url = reverse('admin:auth_group_change', args=[obj.id])
        return format_html('<a href="{}" class="edit-action-btn">✎ Edit</a>', url)
    edit_button.short_description = ''


# ─── Site Settings ──────────────────────────────────────────────────────

@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonModelAdmin, ModelAdmin):
    pass


# ─── Templates ──────────────────────────────────────────────────────────

@admin.register(Template)
class TemplateAdmin(ModelAdmin):
    list_display = ('thumbnail_preview', 'title', 'show_category', 'show_status', 'created_at', 'edit_button')
    list_display_links = ('title',)
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_per_page = 20

    fieldsets = (
        ("Template Info", {
            "fields": ("title", "slug", "category", "description"),
        }),
        ("Media & Preview", {
            "fields": ("thumbnail_image", "live_preview_url"),
        }),
        ("Features & Status", {
            "fields": ("features", "is_active"),
        }),
    )

    def thumbnail_preview(self, obj):
        if obj.thumbnail_image:
            return format_html(
                '<img src="{}" class="admin-thumb" alt="{}"/>',
                obj.thumbnail_image.url, obj.title
            )
        return format_html('<span style="color:#6b7280;font-size:.75rem;">No image</span>')
    thumbnail_preview.short_description = ''

    @display(description="Category", label=True)
    def show_category(self, obj):
        return obj.get_category_display()

    @display(description="Status", label={"Active": "success", "Inactive": "danger"})
    def show_status(self, obj):
        return "Active" if obj.is_active else "Inactive"

    def edit_button(self, obj):
        url = reverse('admin:core_template_change', args=[obj.id])
        return format_html('<a href="{}" class="edit-action-btn">✎ Edit</a>', url)
    edit_button.short_description = ''


# ─── Blog Posts ─────────────────────────────────────────────────────────

@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ('image_preview', 'title', 'show_status', 'created_at', 'edit_button')
    list_display_links = ('title',)
    list_filter = ('status',)
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_per_page = 20

    fieldsets = (
        ("Post Content", {
            "fields": ("title", "slug", "excerpt", "content"),
        }),
        ("Media", {
            "fields": ("featured_image",),
        }),
        ("Publishing", {
            "fields": ("status",),
        }),
    )

    def image_preview(self, obj):
        if obj.featured_image:
            return format_html(
                '<img src="{}" class="admin-thumb" alt="{}"/>',
                obj.featured_image.url, obj.title
            )
        return format_html('<span style="color:#6b7280;font-size:.75rem;">No image</span>')
    image_preview.short_description = ''

    @display(description="Status", label={"Published": "success", "Draft": "warning"})
    def show_status(self, obj):
        return obj.get_status_display()

    def edit_button(self, obj):
        url = reverse('admin:core_blogpost_change', args=[obj.id])
        return format_html('<a href="{}" class="edit-action-btn">✎ Edit</a>', url)
    edit_button.short_description = ''


# ─── Portfolio Projects ─────────────────────────────────────────────────

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(ModelAdmin):
    list_display = ('thumbnail_preview', 'title', 'show_featured', 'created_at', 'edit_button')
    list_display_links = ('title',)
    list_filter = ('is_featured',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_per_page = 20

    fieldsets = (
        ("Project Info", {
            "fields": ("title", "slug", "description"),
        }),
        ("Media", {
            "fields": ("thumbnail", "project_url"),
        }),
        ("Visibility", {
            "fields": ("is_featured",),
        }),
    )

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" class="admin-thumb" alt="{}"/>',
                obj.thumbnail.url, obj.title
            )
        return format_html('<span style="color:#6b7280;font-size:.75rem;">No image</span>')
    thumbnail_preview.short_description = ''

    @display(description="Featured", label={"★ Featured": "success", "Regular": "info"})
    def show_featured(self, obj):
        return "★ Featured" if obj.is_featured else "Regular"

    def edit_button(self, obj):
        url = reverse('admin:core_portfolioproject_change', args=[obj.id])
        return format_html('<a href="{}" class="edit-action-btn">✎ Edit</a>', url)
    edit_button.short_description = ''


# ─── Booking Requests ──────────────────────────────────────────────────

@admin.register(BookingRequest)
class BookingRequestAdmin(ModelAdmin):
    list_display = ('name', 'email', 'service', 'show_status', 'show_urgency', 'created_at', 'edit_button')
    list_display_links = ('name',)
    list_filter = ('status', 'service')
    search_fields = ('name', 'email', 'details')
    list_per_page = 20
    readonly_fields = ('created_at',)

    fieldsets = (
        ("Client Details", {
            "fields": ("name", "email"),
        }),
        ("Service Request", {
            "fields": ("service", "package_tier", "target_date", "details"),
        }),
        ("Management", {
            "fields": ("status", "created_at"),
        }),
    )

    @display(description="Status", label={
        "Pending": "warning",
        "Contacted": "info",
        "Closed": "success",
    })
    def show_status(self, obj):
        return obj.get_status_display()

    @display(description="Urgency", label={
        "Overdue": "danger",
        "Upcoming": "warning",
        "Scheduled": "info",
    })
    def show_urgency(self, obj):
        if obj.target_date:
            now = timezone.now()
            if obj.target_date < now:
                return "Overdue"
            elif (obj.target_date - now).days <= 7:
                return "Upcoming"
        return "Scheduled"

    def edit_button(self, obj):
        url = reverse('admin:core_bookingrequest_change', args=[obj.id])
        return format_html('<a href="{}" class="edit-action-btn">✎ Edit</a>', url)
    edit_button.short_description = ''
