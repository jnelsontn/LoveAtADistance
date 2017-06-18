from django.contrib.auth.models import User
from django.db import models

class Relationship(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='relationship')
    partner = models.OneToOneField(User, on_delete=models.PROTECT, related_name='partner', null=True, blank=True)

    def __str__(self):
    	string = self.user.first_name + ' ' + self.user.last_name + ' relationship'
    	return string