from api.serializers import *
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from django_filters.rest_framework import DjangoFilterBackend

class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users or...
    requesting the current user object.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        """
        Django REST doesn't send a user object back to the
        client by default; therefore, we send a POST request to
        the users/current endpoint to retrieve the information
        """
        pk = self.kwargs.get('pk')

        if pk == 'current':
            return self.request.user

        return super(UserViewSet, self).get_object()

class RelationshipViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

    """
    When a relationship is created, it's important to force the
    system to ensure the request comes from the actual current user
    """
    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

class LimitedNoRelViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    However, we only return a limited selection of
    information in this view.
    """
    serializer_class = LimitedNoRelSerializer

    def get_queryset(self):
        """
        We override the default behavior to return a list of users
        who are NOT in a relationship (meaning they have not requested
        one or are in one). We then exclude the current user from the
        list.
        This view is used either for a) to search for a partner by their
        email or b) to query a user by using /?pk=User Id.
        """
        queryset = User.objects.all().filter(
            relationship=None).exclude(id=self.request.user.id)
        
        email = self.request.query_params.get('email', None)
        pk = self.request.query_params.get('pk', None)

        if email is not None:
            queryset = queryset.filter(email=email)

        if pk is not None:
            queryset = User.objects.all().filter(pk=pk, 
                relationship__isnull=False).exclude(id=self.request.user.id)

        return queryset

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        We only show notifications that have not been viewed and
        are addressed to the current user
        """
        queryset = Notification.objects.filter(viewed=0, to_user=self.request.user.id)

        pk = self.request.query_params.get('pk', None)
        if pk is not None:
            queryset = queryset.filter(pk=pk)
        return queryset

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super(NotificationViewSet, self).get_serializer(*args, **kwargs)

class RelCheckViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for checking the existence
    of a relationship.
    """
    queryset = User.objects.all()
    serializer_class = RelCheckSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for the Profile properties
    that are extended from the User model.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

class ImportantNumberViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving
    important phone numbers.
    """
    queryset = ImportantNumber.objects.all()
    serializer_class = ImportantNumberSerializer

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

class PhotoViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for displaying photos.
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

class TodoCalendarViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for Todo listings and calendar
    dates.
    """
    queryset = TodoCalendar.objects.all()
    serializer_class = TodoCalendarSerializer

    def get_queryset(self):
        """
        When we call a query, we do not want to pull in any more data than needed.
        """
        queryset = TodoCalendar.objects.filter(
            user=self.request.user.id).order_by('date')[:10]
        return queryset

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

class MessageViewSet(viewsets.ModelViewSet):
    """
    A simple viewset for listing or displaying messages.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self): # for now we want more than just the current user
        """
        Limit the set of messages retrieved to the user's last ten
        """
        queryset = Message.objects.filter(
            user=self.request.user.id).order_by('-create_time')[:10]
        return queryset

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the message
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

