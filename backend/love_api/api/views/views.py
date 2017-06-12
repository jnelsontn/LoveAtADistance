from api.serializers import *
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from rest_framework.views import APIView
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == 'current':
            return self.request.user

        return super(UserViewSet, self).get_object()

class RelCheckViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RelCheckSerializer

class LimitedNoRelViewSet(viewsets.ModelViewSet):
    serializer_class = LimitedNoRelSerializer

    def get_queryset(self):
        """
        This view returns a list of all users whom are not in a
        relationship and whom are not the current user user.
        Used when we built a list for the user to select.
        Sent are 'id', 'first_name', 'last_name',,
        """
        queryset = User.objects.filter(relationship=None).exclude(id=self.request.user.id)
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email=email)
        return queryset

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

    # over_road so that the user is automatically added when
    # sending a relationship request
    # user is marked as read-only field in serializer
    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

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


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

