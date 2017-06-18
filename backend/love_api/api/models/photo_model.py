from versatileimagefield.fields import VersatileImageField
from django.contrib.auth.models import User
from django.db import models

class Photo(models.Model):
    """
    Store user uploads in MEDIA_ROOT/user_id
    """
    def user_directory(self, file):
        return '{}/{}'.format(self.user.id, file)

    def __str__(self):
    	return self.photo

    user = models.ForeignKey(User, related_name='photos', on_delete=models.CASCADE)
    photo = VersatileImageField(upload_to=user_directory)
    photo_name = models.CharField(max_length=50)
    uploaded_at = models.DateTimeField(auto_now_add=True)