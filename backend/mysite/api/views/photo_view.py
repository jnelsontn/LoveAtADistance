from rest_framework import viewsets
from api.serializers import *
from api.models import *

class PhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Orders to be viewed or edited.
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer