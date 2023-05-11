from django.contrib import admin

from .models import Chat

# Register your models here.

class ChatAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username', 'user__email']
    class Meta:
        model = Chat

admin.site.register(Chat, ChatAdmin)