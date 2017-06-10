from django.contrib.auth.models import User
from django.db import models

class Photo(models.Model):
	user = models.ForeignKey(User, related_name='photos', on_delete=models.CASCADE)
	photo = models.ImageField(blank=False, null=False)