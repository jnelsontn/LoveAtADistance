from django.contrib.auth.models import User, Group
from rest_framework.response import Response
from rest_framework import viewsets
from api.serializers import *
from api.models import *

class ProfileViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for the Profile properties
    that are extended from the User model.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        """
        Only retrieve the profile properties belonging to the
        current user
        """
        queryset = Profile.objects.all().filter(
            user=self.request.user.id)
        return queryset

    def perform_update(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        serializer.save(id=self.request.user.id)