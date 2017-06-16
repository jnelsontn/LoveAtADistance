from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.serializers import *
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """

    class Meta:
        """
        The UserSerializer has almost all models attached by the
        way of the User model (one to one relationship), 
        a depth of one allows to easily pull properities off 
        of the object
        """
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'profile', 'relationship',
        'notifications', 'last_login', 'date_joined')
        read_only_fields = ('last_login', 'date_joined', 'username', 'id')
        depth = 1

class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Profile
        exclude = ('user', 'id',)

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

class LimitedNoRelSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = User
        fields = ('id', 'first_name', 'last_name', 'relationship', 'email',)

class GroupSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Group
        exclude = ()
