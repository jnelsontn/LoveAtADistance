from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class MessageViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for listing or displaying messages.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        Limit the set of messages retrieved to the user's last ten
        NOTE: can't limit right now if i want to delete...
        """
        queryset = Message.objects.filter(
            user=self.request.user.id).order_by('-create_time') # [:10]
        return queryset

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the message
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)