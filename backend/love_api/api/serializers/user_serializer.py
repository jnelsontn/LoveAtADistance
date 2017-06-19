from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.serializers import *
from api.models import *

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    # cannot use until we attach the partner model rather than depth = 1
    # messages = serializers.SerializerMethodField()
    # def get_messages(self, obj):
    #     uid = self.context['request'].user
    #     query = Message.objects.filter(user=uid).order_by('-create_time')[:10]
    #     serializer = MessageSerializer(query, many=True)
    #     return serializer.data

    class Meta:
        """
        The UserSerializer has almost all models attached by the
        way of the User model (one to one relationship), 
        a depth of one allows to easily pull prop. off 
        of the object
        """
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
         'email', 'messages', 'calendar', 'photos', 'profile', 
         'relationship', 'notifications', 'numbers',
         'last_login', 'date_joined')
        read_only_fields = ('last_login', 'date_joined', 'username', 'id')
        depth = 1

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
