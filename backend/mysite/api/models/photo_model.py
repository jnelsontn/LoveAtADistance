from django.contrib.auth.models import User
from django.db import models

class Photo(models.Model):
	user = models.ForeignKey(User, on_delete=models.PROTECT)
	photo = models.ImageField(blank=True)
	create_time = models.DateTimeField(auto_now_add=True)