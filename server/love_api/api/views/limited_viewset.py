from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.serializers import *
from api.models import *

class LimitedViewSet(viewsets.ModelViewSet):
    """
    A simple, limited, ViewSet for listing 
    or retrieving users.
    """
    queryset = User.objects.all()
    serializer_class = LimitedSerializer

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
            queryset = queryset.filter(email__iexact=email)

        if pk is not None:
            queryset = User.objects.filter(pk=pk, 
                relationship__isnull=False).exclude(id=self.request.user.id)

        return queryset

class RelCheckViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for checking the existence
    of a relationship before relationships are made.
    """
    queryset = User.objects.all()
    serializer_class = RelCheckSerializer
