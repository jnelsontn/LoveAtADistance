from django.contrib.auth.models import User
from django.db import models

class Photo(models.Model):

    def user_directory(self, file):
        return '{}/{}'.format(self.user.id, file)

    user = models.ForeignKey(User, related_name='photos', on_delete=models.CASCADE)
    photo = models.ImageField(blank=False, null=False, upload_to=user_directory)
    photo_name = models.CharField(max_length=50)
    uploaded_at = models.DateTimeField(auto_now_add=True)
