from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *
from api.serializers import *

class UserSerializer(serializers.ModelSerializer):

    #messages = MessageSerializer(many=True)
    #weather = serializers.SerializerMethodField('get_weather')
    #messages = serializers.PrimaryKeyRelatedField(many=True, queryset=Message.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'profile', 'relationship',
         'last_login', 'date_joined')
        read_only_fields = ('last_login', 'date_joined')
        depth = 1
	# def get_weather(self, obj):
    # return "weather city county{}".format(obj.city)

class RelCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'relationship')
        depth = 1

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        exclude = ()






