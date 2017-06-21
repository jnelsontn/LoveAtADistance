from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class PhotoViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for displaying photos.
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def get_queryset(self):
        """
        Only retrieve the photos belonging to the
        current user
        """
        queryset = Photo.objects.all().filter(
            user=self.request.user.id)

        return queryset

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)
