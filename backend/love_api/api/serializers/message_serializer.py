from rest_framework import serializers
from api.models import *

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        exclude = ()