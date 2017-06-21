from django.contrib.auth.models import User
from django.db import models

class Notification(models.Model):
    id = models.IntegerField(primary_key=True)
    from_user = models.OneToOneField(User, on_delete=models.CASCADE, 
        related_name='from_user')
    to_user = models.OneToOneField(User, on_delete=models.PROTECT, 
        related_name='notifications', null=False, blank=False)
    viewed = models.BooleanField(default=0)

    def __str__(self):
        string = 'from: ' + self.from_user.username + ' to: ' + self.to_user.username
        return string