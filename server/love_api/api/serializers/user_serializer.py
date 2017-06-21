from versatileimagefield.fields import VersatileImageField
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .profile_serializer import  *
from .photo_serializer import  *
from api.serializers import *
from api.models import *

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    class Meta:
        """
        We only use the User Serializer until we check
        for a relationship between two users, then the
        partner serializer does all the heavy lifting.
        """
        model = User
        fields = ('id', 'first_name', 'last_name',
         'email', 'notifications', 'relationship',)
        read_only_fields = ('username', 'id')
        depth = 1

class PartnerSerializer(serializers.ModelSerializer):
    """
    The "Main Event" which handles all data when two users
    are connected.
    """
    profile = ProfileSerializer(many=False, required=False)
    photos = PhotoSerializer(many=True, required=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'photos', 'profile', 
         'relationship', 'notifications', 'numbers',
         'last_login', 'date_joined',)
        read_only_fields = ('id', 'username', 'last_login', 'date_joined',)
        depth = 1

class LimitedSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = User
        fields = ('id', 'first_name', 'last_name', 'relationship', 'email')

class RelCheckSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = User
        fields = ('relationship', 'id',)
        depth = 1
