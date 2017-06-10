from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now

class TodoCalendar(models.Model):
    user = models.ForeignKey(User, related_name='calendar', on_delete=models.CASCADE)
    message = models.TextField(max_length=800, blank=False, null=False)
    event_date = models.DateTimeField(blank=False, null=False)

    def has_expired(self):
    	return now() > self.event_date

    def __str__(self):
        return "id: {}, username: {}".format(self.user.id, self.user.username)