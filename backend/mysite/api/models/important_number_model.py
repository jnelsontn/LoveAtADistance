from django.contrib.auth.models import User
from django.db import models

class ImportantNumber(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    important_name = models.CharField(max_length=50, blank=False)
    important_number = models.IntegerField(blank=False)