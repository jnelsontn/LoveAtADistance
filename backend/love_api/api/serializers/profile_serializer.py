from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        exclude = ()

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        exclude = ()

    # When a User is created, create their Profile too
    def update(self, instance, data):
        instance = super(UserSerializer, self).update(instance, data)
        instance.save()

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        exclude = ()