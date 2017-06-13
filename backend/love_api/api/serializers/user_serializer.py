from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *
from api.serializers import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'profile', 'relationship',
         'to_user', 'from_user', 'last_login', 'date_joined')
        read_only_fields = ('last_login', 'date_joined', 'username', 'id')
        depth = 1

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = ('user', 'id',)

class RelCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('relationship', 'id',)
        depth = 1

class LimitedNoRelSerializer(serializers.ModelSerializer):
    # we can actually keep out the email field...
    # we use this for limited views and searching
    class Meta:
        model = User
        fields = ('id', 'first_name', 'relationship',)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        exclude = ()






