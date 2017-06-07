from django.contrib import admin

# Register your models here.
from api.models import *

# Register your models here.
admin.site.register(Connection)
admin.site.register(ImportantNumber)
admin.site.register(Message)
admin.site.register(Photo)
admin.site.register(Profile)
admin.site.register(TodoCalendar)