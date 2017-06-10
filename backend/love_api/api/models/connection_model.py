from django.contrib.auth.models import User
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver

class Connection(models.Model):
    user = models.OneToOneField(User, related_name='myuser_connection', on_delete=models.CASCADE)
    connected_user = models.OneToOneField(User, on_delete=models.PROTECT, related_name="connected_user", null=True, blank=True)
    are_they_connected = models.IntegerField(default=0)

    def __str__(self):
    	string = self.user.first_name + ' ' + self.user.last_name + ' connection'
    	return string

@receiver(post_save, sender=User)
def create_initial_connection(sender, instance, created, **kwargs):
    if created:
        Connection.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_initial_connection(sender, instance, **kwargs):
#     instance.connection.save()