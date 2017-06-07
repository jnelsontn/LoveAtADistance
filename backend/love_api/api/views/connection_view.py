from rest_framework import viewsets
from api.serializers import *
from api.models import *

class ConnectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Orders to be viewed or edited.
    """
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
