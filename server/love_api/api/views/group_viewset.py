from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
