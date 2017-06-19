from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

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

    def perform_update(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        serializer.save(id=self.request.user.id)