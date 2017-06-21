from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.serializers import *
from api.models import *

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super(NotificationViewSet, self).get_serializer(*args, **kwargs)


