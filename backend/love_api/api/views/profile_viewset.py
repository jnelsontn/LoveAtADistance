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

    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # def get_queryset(self):
    #     """
    #     Only retrieve the profile properties belonging to the
    #     current user
    #     """
    #     queryset = Profile.objects.all().filter(
    #         user=self.request.user.id)
    #     return queryset