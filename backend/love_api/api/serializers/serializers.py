from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *
from .user_serializer import *

class RelationshipSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    # Make sure the user who sent request is who is posted to user
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Relationship
        exclude = ()

    def create(self, validated_data):
        request_from = self.context['request'].user.id
        request_from = User.objects.get(pk=request_from)
        request_to = validated_data['partner'].id
        request_to = User.objects.get(pk=request_to)
        
        try:
            Notification.objects.create(from_user=request_from, to_user=request_to, message="Relationship Request")
        except:
            pass

        return Relationship.objects.create(**validated_data)

class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Notification
        exclude = ()
        depth = 1

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Message
        exclude = ('id',)

class TodoCalendarSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = TodoCalendar
        exclude = ()

class ImportantNumberSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = ImportantNumber
        exclude = ()

class PhotoSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Photo
        exclude = ()



                # self.context['request'].user.id
                # self.context['request'].data ) # the data which is 'partner' and : 4
               # validated_data['partner'].id )  # id of partner

    # def create(self, validated_data):
    #     print( validated_data ) # prints a dict of partner by their username
    #     return Relationship.objects.create(**validated_data)

