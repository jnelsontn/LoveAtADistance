from versatileimagefield.serializers import VersatileImageFieldSerializer
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.serializers import *
from api.models import *

class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    user = serializers.ReadOnlyField(source='user.id')
    profile_photo = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('medium_square_crop', 'crop__400x400'),
            ('profile', 'thumbnail__250x250'),
        ], required=False)

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Profile
        exclude = ()
