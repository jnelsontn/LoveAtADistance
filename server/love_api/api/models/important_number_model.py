from django.contrib.auth.models import User
from django.db import models

class ImportantNumber(models.Model):
    user = models.ForeignKey(User, related_name='numbers', 
    	on_delete=models.CASCADE)
    important_name = models.CharField(max_length=50, 
    	blank=False, null=False)
    important_number = models.CharField(max_length=20, 
    	blank=False, null=False)

    def __str__(self):
        return 'UserID: {}, Important Person: {} Number: {}'.format(
        	self.user.id, self.important_name, self.important_number)