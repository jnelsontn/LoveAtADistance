from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *
from api.serializers import *

class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        exclude = ('user', 'url')

class RelationshipSerializer(serializers.HyperlinkedModelSerializer):

    # user = serializers.ReadOnlyField(source='user.id')
    partner = serializers.ReadOnlyField(source='partner.id')

    class Meta:
        model = Relationship
        exclude = ('url', 'user')

class MessageSerializer(serializers.HyperlinkedModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Message
        fields = ('user', 'message', 'create_time')

class TodoCalendarSerializer(serializers.HyperlinkedModelSerializer):

    expired = serializers.ReadOnlyField(source='has_expired')
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TodoCalendar
        fields = ('url', 'expired', 'user', 'message', 'event_date')

class ImportantNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ImportantNumber
        exclude = ()

class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        exclude = ()


