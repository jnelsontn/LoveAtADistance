from rest_framework import serializers
from api.models import *

class ImportantNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ImportantNumber
        exclude = ()