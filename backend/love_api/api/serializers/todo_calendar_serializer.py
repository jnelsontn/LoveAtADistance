from rest_framework import serializers
from api.models import *

class TodoCalendarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TodoCalendar
        exclude = ()