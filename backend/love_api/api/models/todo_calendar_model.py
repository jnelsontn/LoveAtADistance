from django.contrib.auth.models import User
from django.db import models

class TodoCalendar(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    message = models.TextField(max_length=800, blank=False)
    event_date = models.DateTimeField(blank=False)
    create_time = models.DateTimeField(auto_now_add=True)