from api.serializers import *
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == 'current':
            return self.request.user

        return super(UserViewSet, self).get_object()

class ProfileViewSet(viewsets.ModelViewSet):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class GroupViewSet(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

class ImportantNumberViewSet(viewsets.ModelViewSet):
    queryset = ImportantNumber.objects.all()
    serializer_class = ImportantNumberSerializer

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class TodoCalendarViewSet(viewsets.ModelViewSet):
    queryset = TodoCalendar.objects.all()
    serializer_class = TodoCalendarSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer