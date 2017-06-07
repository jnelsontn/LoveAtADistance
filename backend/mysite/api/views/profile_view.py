from django.contrib.auth.models import User, Group
# from django.core import serializers - remove if no errors
from rest_framework import viewsets

from api.serializers import *
from api.models import *

class UserViewSet(viewsets.ModelViewSet):
    # built-in Django model
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by('-create_time')
    serializer_class = ProfileSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer