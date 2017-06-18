from versatileimagefield.fields import VersatileImageField
from django.contrib.auth.models import User
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver

# Profile extends upon the default User model
class Profile(models.Model):

    def user_directory(self, file):
        return '{}/{}'.format(self.user.id, file)

    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    bio = models.TextField(max_length=800, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    state = models.CharField(max_length=30, null=True, blank=True)
    country = models.CharField(max_length=30, null=True, blank=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    profile_photo = VersatileImageField(upload_to=user_directory)

    def __str__(self):
        return "UserID: {}, Name: {} {}".format(self.user.id, self.user.first_name, self.user.last_name)

"""
When a User is created, the code below instantiates the 'Profile'
model (above) which is the extended fields of a User instance.
"""
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
