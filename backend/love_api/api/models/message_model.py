from django.contrib.auth.models import User
from django.db import models

class Message(models.Model):
    user = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    message = models.TextField(max_length=800, blank=False, null=False)
    create_time = models.DateTimeField(auto_now_add=False)

    def __str__(self):
        return "id: {}, username: {}".format(self.user.id, self.user.username)