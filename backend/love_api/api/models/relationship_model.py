from django.contrib.auth.models import User
from django.db import models

class Relationship(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, 
    	related_name='relationship')
    partner = models.OneToOneField(User, on_delete=models.PROTECT, 
    	related_name='partner', null=True, blank=True)

    class Meta:
        unique_together = ( ('user', 'partner'), ('partner', 'user'), )

    def __str__(self):
    	return str(self.user.id)