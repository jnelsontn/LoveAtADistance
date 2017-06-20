from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .user_serializer import *
from api.models import *

class RelationshipSerializer(serializers.ModelSerializer):
    """
    Serializer to map the Model instance into JSON format.
    """
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        """
        Meta class to map serializer's fields with the model fields.
        """
        model = Relationship
        exclude = ()

    def create(self, validated_data):
        """
        When a Relationship is created (a request sent), 
        the system creates a notification to the individual requested
        to be presented when they logon
        """
        request_from = self.context['request'].user.id
        request_from = User.objects.get(pk=request_from)
        request_to = validated_data['partner'].id
        request_to = User.objects.get(pk=request_to)

        """
        1. Ensure this is not a "response" creation; meaning that although a user sent a
           user a request, we're not trying to "respond" to it automatically.
        """
        reply = False
        try:
            """
            2.We check if a relationship already exists if the situation was 'reversed'
            if so, we know this is a response to a request
            """
            Notification.objects.get(from_user=request_to, to_user=request_from, viewed=0)
            reply = True
        except:
            pass

        """
        If reply = True, event is never triggered
        """ 
        if reply is False:
            try:
                """
                Although the system forces uniqueness, it never hurts to check
                at this point, no response has been given but a request was made
                """
                Notification.objects.get(from_user=request_from,
                    to_user=request_to, viewed=0)
            except:
                """
                If the above passes, meaning a request has not been created or the other user
                has NOT made a notification, it can safely be done here
                the User who sent the request may also delete it, thankfully... we should
                actually link those fields
                """
                Notification.objects.create(id=request_from.id, from_user=request_from, 
                    to_user=request_to)
        
        return Relationship.objects.create(**validated_data)
