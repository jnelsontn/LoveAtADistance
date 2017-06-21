from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import *
from api.serializers import *

class RelationshipViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

    def get_queryset(self):
        """
        Only retrieve the user's information.
        """
        queryset = Relationship.objects.filter(
            user_id=self.request.user.id).order_by('id') # [:10]
        return queryset

    """
    When a relationship is created, it's important to force the
    system to ensure the request comes from the actual current user
    """
    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)



