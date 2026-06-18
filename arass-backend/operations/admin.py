from django.contrib import admin
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import Client, Project, Task, WorkLog, CompanyDocument
from django.utils.html import format_html
from django.urls import reverse
from django.utils import timezone


@admin.register(Client)
class ClientAdmin(ModelAdmin):
    list_display = ('name', 'company', 'email', 'phone', 'deadline', 'created_at')
    list_editable = ('company', 'email', 'phone', 'deadline')
    search_fields = ('name', 'company', 'email')
    list_filter = ('created_at',)
    list_per_page = 20

    fieldsets = (
        ("Client Info", {
            "fields": ("name", "company", "email", "phone"),
        }),
        ("Details", {
            "fields": ("deadline", "notes"),
        }),
    )


@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ('title', 'project_type', 'client', 'show_status', 'show_progress', 'deadline', 'show_pricing', 'created_at')
    list_editable = ('project_type', 'client', 'deadline')
    search_fields = ('title', 'description')
    list_filter = ('project_type', 'status')
    list_per_page = 20

    fieldsets = (
        ("Project Info", {
            "fields": ("title", "project_type", "client", "description"),
        }),
        ("Status & Progress", {
            "fields": ("status", "progress"),
        }),
        ("Deadline & Pricing", {
            "fields": ("deadline", "pricing"),
        }),
    )

    def save_formset(self, request, form, formset, change):
        try:
            super().save_formset(request, form, formset, change)
        except Exception as e:
            from django.contrib import messages
            import traceback
            messages.error(request, f"Error saving changelist: {str(e)} | Trace: {traceback.format_exc()[:500]}")

    def changelist_view(self, request, extra_context=None):
        try:
            return super().changelist_view(request, extra_context)
        except Exception as e:
            from django.contrib import messages
            import traceback
            messages.error(request, f"Changelist error: {str(e)} | Trace: {traceback.format_exc()[:500]}")
            from django.http import HttpResponseRedirect
            return HttpResponseRedirect(request.path)

    @display(description="Status", label={
        "Planning": "warning",
        "In Progress": "info",
        "Review": "primary",
        "Completed": "success",
        "On Hold": "danger",
    })
    def show_status(self, obj):
        return obj.get_status_display()

    @display(description="Progress")
    def show_progress(self, obj):
        color = "#10b981" if obj.progress == 100 else "#3b82f6"
        return format_html(
            '<div style="width: 100%; background-color: #e5e7eb; border-radius: 4px;">'
            '<div style="width: {}%; background-color: {}; height: 8px; border-radius: 4px;"></div>'
            '</div> <span style="font-size: 0.8em; color: #6b7280;">{}%</span>',
            obj.progress, color, obj.progress
        )

    def show_pricing(self, obj):
        if obj.pricing:
            return format_html('<span style="color: #10b981; font-weight: 600;">₹{:,.2f}</span>', obj.pricing)
        return format_html('<span style="color: #6b7280;">—</span>')
    show_pricing.short_description = "Pricing"


@admin.register(Task)
class TaskAdmin(ModelAdmin):
    list_display = ('title', 'project', 'assigned_to', 'due_date', 'show_pricing', 'is_completed')
    list_editable = ('assigned_to', 'due_date', 'is_completed')
    list_filter = ('is_completed', 'assigned_to', 'project')
    search_fields = ('title', 'description')
    list_per_page = 20

    fieldsets = (
        ("Task Info", {
            "fields": ("title", "description", "project"),
        }),
        ("Assignment", {
            "fields": ("assigned_to", "due_date", "pricing"),
        }),
        ("Completion", {
            "fields": ("is_completed",),
        }),
    )

    def show_pricing(self, obj):
        if obj.pricing:
            return format_html('<span style="color: #10b981; font-weight: 600;">₹{:,.2f}</span>', obj.pricing)
        return format_html('<span style="color: #6b7280;">—</span>')
    show_pricing.short_description = "Price"

    def save_model(self, request, obj, form, change):
        if obj.is_completed and not obj.completed_at:
            obj.completed_at = timezone.now()
        elif not obj.is_completed:
            obj.completed_at = None
        super().save_model(request, obj, form, change)


@admin.register(WorkLog)
class WorkLogAdmin(ModelAdmin):
    list_display = ('user', 'date', 'hours_spent', 'task', 'short_description')
    list_editable = ('date', 'hours_spent')
    list_filter = ('user', 'date')
    search_fields = ('description',)
    list_per_page = 20

    def short_description(self, obj):
        text = obj.description[:80]
        if len(obj.description) > 80:
            text += "..."
        return text
    short_description.short_description = "Description"


@admin.register(CompanyDocument)
class CompanyDocumentAdmin(ModelAdmin):
    list_display = ('title', 'category', 'uploaded_by', 'uploaded_at', 'document_link')
    list_editable = ('category',)
    list_filter = ('category',)
    search_fields = ('title',)
    list_per_page = 20

    def document_link(self, obj):
        if obj.file:
            try:
                url = obj.file.url
            except Exception:
                url = str(obj.file)
            return format_html('<a href="{}" target="_blank" class="edit-action-btn">View Document</a>', url)
        return "-"
    document_link.short_description = "File"
