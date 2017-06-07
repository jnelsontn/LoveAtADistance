from rest_framework import serializers
from api.models import *

class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        exclude = ()