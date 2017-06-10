from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *
from api.serializers import *

class UserSerializer(serializers.HyperlinkedModelSerializer):

    messages = MessageSerializer(many=True)
    calendar = TodoCalendarSerializer(many=True)
    profile = ProfileSerializer(many=False)
    relationship = RelationshipSerializer(many=False)

    # weather = serializers.SerializerMethodField('get_weather')

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'profile', 'relationship',
         'last_login', 'date_joined')

        read_only_fields = ('last_login', 'date_joined')

	# def get_weather(self, obj):
 #    	return "weather city county{}".format(obj.city)

class LimitedUserSerializer(serializers.HyperlinkedModelSerializer):

    relationship = RelationshipSerializer(many=False)

    class Meta:
        model = User
        fields = ('relationship',)

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        exclude = ()
