from api.serializers import *
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == 'current':
            return self.request.user

        return super(UserViewSet, self).get_object()

# class UserDetail(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = UserSerializer
 
#     def get_queryset(self):
#         return User.objects.all().filter(username=self.request.user)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class GroupViewSet(viewsets.ModelViewSet):

    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

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

# limited viewset, lets just get name and relationship
class LimitedUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = LimitedUserSerializer





