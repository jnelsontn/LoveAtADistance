from django.contrib.auth.models import User
from django.db import models

class Connection(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="current_user")
    connected_user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="connected_user")
    are_they_connected = models.IntegerField(default=0)