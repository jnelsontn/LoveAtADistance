from versatileimagefield.fields import VersatileImageField
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.serializers import *
from api.models import *
from .profile_serializer import  *

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    class Meta:
        """
        The UserSerializer has almost all models attached by the
        way of the User model (one to one relationship), 
        a depth of one allows to easily pull prop. off 
        of the object
        """
        model = User
        fields = ('id', 'first_name', 'last_name',
         'email', 'notifications', 'relationship',)
        read_only_fields = ('username', 'id')
        depth = 1

class PartnerSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    profile = ProfileSerializer(many=False, required=False)
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
        User can still search by e-mail even if they cannot see it
        """
        model = User
        fields = ('id', 'first_name', 'last_name', 'relationship',)

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
