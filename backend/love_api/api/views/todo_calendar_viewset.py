from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class TodoCalendarViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for Todo listings and calendar
    dates.
    """
    queryset = TodoCalendar.objects.all()
    serializer_class = TodoCalendarSerializer

    def get_queryset(self):
        """
        Only retrieve the user's information.
        """
        queryset = TodoCalendar.objects.filter(
            user=self.request.user.id).order_by('date')
        return queryset

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)