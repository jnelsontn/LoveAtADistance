from rest_framework import serializers
from api.models import *

class ConnectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Connection
        exclude = ()