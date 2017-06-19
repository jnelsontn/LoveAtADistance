from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class ImportantNumberViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving
    important phone numbers.
    """
    queryset = ImportantNumber.objects.all()
    serializer_class = ImportantNumberSerializer

    def get_queryset(self):
        """
        When we call a query, we do not want to 
        pull in any more data than needed.
        """
        queryset = ImportantNumber.objects.filter(
            user=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)