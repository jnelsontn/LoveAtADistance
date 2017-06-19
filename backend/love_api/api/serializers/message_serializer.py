from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .user_serializer import *
from api.models import *

class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Message
        exclude = ()