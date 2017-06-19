from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.serializers import *
from api.models import *

class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Profile
        exclude = ()
