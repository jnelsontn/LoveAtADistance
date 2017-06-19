from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        We only show notifications that have not been viewed and
        are addressed to the current user
        """
        queryset = Notification.objects.filter(viewed=0, to_user=self.request.user.id)

        pk = self.request.query_params.get('pk', None)
        if pk is not None:
            queryset = queryset.filter(pk=pk)
        return queryset

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super(NotificationViewSet, self).get_serializer(*args, **kwargs)