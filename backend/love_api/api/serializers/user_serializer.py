from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.serializers import *
from api.models import *

class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Message
        exclude = ()

class TodoCalendarSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = TodoCalendar
        exclude = ()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    # messages = serializers.SerializerMethodField()
    # calendar = serializers.SerializerMethodField()

    """
    We want to ensure that the user only recieves the latest ten messages
    posted; therefore, they're not downloading (or viewing) hundreds at a
    time.
    """
    # def get_messages(self, obj):
    #     uid = self.context['request'].user
    #     query = Message.objects.filter(user=uid).order_by('-create_time')[:10]
    #     serializer = MessageSerializer(query, many=True)
    #     return serializer.data

    """
    If we attach another model to the serializer, we must modify the querysets
    of the data we wish to get back, on this serializer
    """
    # def get_calendar(self, obj):
    #     uid = self.context['request'].user
    #     query = TodoCalendar.objects.filter(user=uid).order_by('date')
    #     serializer = TodoCalendarSerializer(query, many=True)
    #     return serializer.data

    ################ READ ME ##############################################
    # The above code works well to limit the results to our own things and
    # filter on the user model but until we 'verify' our connections, 
    # we limit our results to only us...will look at groups

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
