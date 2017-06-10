from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *

class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Profile
        exclude = ('user', 'url')

class MessageSerializer(serializers.HyperlinkedModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Message
        fields = ('user', 'message', 'url')

class TodoCalendarSerializer(serializers.HyperlinkedModelSerializer):

    expired = serializers.ReadOnlyField(source='has_expired')
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TodoCalendar
        fields = ('url', 'expired', 'user', 'message', 'event_date')

class ConnectionSerializer(serializers.HyperlinkedModelSerializer):

    user = serializers.ReadOnlyField(source='user.id')
    connected_user = serializers.ReadOnlyField(source='connected_user.id')

    class Meta:
        model = Connection
        exclude = ()

class ImportantNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ImportantNumber
        exclude = ()

class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        exclude = ()


class UserSerializer(serializers.HyperlinkedModelSerializer):

    messages = MessageSerializer(many=True)
    calendar = TodoCalendarSerializer(many=True)
    profile = ProfileSerializer(many=False)
    myuser_connection = ConnectionSerializer(many=False)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'profile', 'myuser_connection')
        #depth = 1

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        exclude = ()
