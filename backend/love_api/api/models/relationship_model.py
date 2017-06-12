from django.contrib.auth.models import User
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver

class Relationship(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='relationship')
    partner = models.OneToOneField(User, on_delete=models.PROTECT, related_name="partner", null=True, blank=True)

    def __str__(self):
    	string = self.user.first_name + ' ' + self.user.last_name + ' relationship'
    	return string

# @receiver(post_save, sender=User)
# def create_initial_relationship(sender, instance, created, **kwargs):
#     if created:
#         Relationship.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_initial_connection(sender, instance, **kwargs):
#     instance.connection.save()