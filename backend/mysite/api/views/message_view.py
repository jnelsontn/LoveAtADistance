from rest_framework import viewsets
from api.serializers import *
from api.models import *

class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Orders to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer