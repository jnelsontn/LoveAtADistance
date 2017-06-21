from versatileimagefield.serializers import VersatileImageFieldSerializer
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .user_serializer import *
from api.models import *

class PhotoSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    user = serializers.ReadOnlyField(source='user.id')
    photo = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('medium_square_crop', 'crop__400x400'),
            ('profile', 'thumbnail__250x250'),
            ('thumbnail', 'thumbnail__100x100'),
        ]) 

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Photo
        exclude = ()