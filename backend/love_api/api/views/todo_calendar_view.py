from rest_framework import viewsets
from api.serializers import *
from api.models import *

class TodoCalendarViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Orders to be viewed or edited.
    """
    queryset = TodoCalendar.objects.all()
    serializer_class = TodoCalendarSerializer