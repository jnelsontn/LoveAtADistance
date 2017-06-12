from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = ('user', 'id',)

class RelationshipSerializer(serializers.ModelSerializer):

    # we need this read only field so someone can't pretend
    # to be another user
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Relationship
        exclude = ()

class LimitedNoRelSerializer(serializers.ModelSerializer):
    # we can actually keep out the email field...
    # we use this for limited views and searching
    class Meta:
        model = User
        fields = ('id', 'first_name', 'relationship',)

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        exclude = ('id')

class TodoCalendarSerializer(serializers.ModelSerializer):

    class Meta:
        model = TodoCalendar
        exclude = ()

class ImportantNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantNumber
        exclude = ()

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        exclude = ()


