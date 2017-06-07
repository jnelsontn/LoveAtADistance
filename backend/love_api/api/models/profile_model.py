from django.contrib.auth.models import User
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver

# Profile extends upon the default Django User Model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, related_name="profile")
    bio = models.TextField(max_length=800, blank=True)
    city = models.CharField(max_length=30, blank=True)
    state = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "UserID: {}, Name: {} {}".format(self.user.id, self.user.first_name, self.user.last_name)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
