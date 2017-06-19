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

    """
    When a relationship is created, it's important to force the
    system to ensure the request comes from the actual current user
    """
    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(user=user)

    def get_object(self):

        pk = self.kwargs.get('pk')

        # will add try/except here
        if pk == 'relcheck':
            sent_req = Relationship.objects.get(user=self.request.user.id)

            if sent_req.partner:
                 returned_req = Relationship.objects.get(user=sent_req.partner.id)

                 if returned_req:
                 
                    they_have_us = Relationship.objects.get(user=returned_req.user.id, 
                        partner=self.request.user.id)

                    # if we can match this... lets grant user profile

                    return they_have_us

        return super(RelationshipViewSet, self).get_object()
