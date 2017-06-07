from rest_framework import viewsets
from api.serializers import *
from api.models import *

class ImportantNumberViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Orders to be viewed or edited.
    """
    queryset = ImportantNumber.objects.all()
    serializer_class = ImportantNumberSerializer