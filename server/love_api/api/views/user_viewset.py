from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.serializers import *
from api.models import *

class UserViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for listing or retrieving users
    """
    queryset = User.objects.all()
    serializers = {
        'DEFAULT': UserSerializer,
        'PARTNER': PartnerSerializer,
    }

    def get_object(self):
        """
        Django REST doesn't send a user object back to the
        client by default; so we can return the user to the
        client when they request 'current'
        """
        pk = self.kwargs.get('pk')

        if pk == 'current':
            return self.request.user
        elif pk == 'partner':
            partner = self.request.user.relationship.partner
            return partner

        return super(UserViewSet, self).get_object()

    def get_queryset(self):
        """
        Only retrieve the user's information.
        """
        queryset = User.objects.all().filter(
            id=self.request.user.id)
        return queryset

    def perform_update(self, serializer):
        """
        Automatically attach the logged-in-user as the one who is
        posting the event
        """
        serializer.save(id=self.request.user.id)

    def get_serializer_class(self):
        try:
            """Has the user sent a request to a partner?"""
            sent_relationship = Relationship.objects.get(user=self.request.user.id).partner.id

            if type(sent_relationship == int):
                """ Has the other user confirmed the relationship?"""
                try:
                    do_we_have_a_partner = Relationship.objects.filter(
                        user=sent_relationship, partner=self.request.user.id).values_list(
                        'user', 'partner').order_by('id')

                    partner_id = do_we_have_a_partner[0][0]

                    """If so, lets give them each other's information"""
                    if sent_relationship == partner_id:
                        return self.serializers.get(self.action, self.serializers['PARTNER'])

                except:
                    pass
        except:
            pass

        """Otherwise the 'normal' serializer will be used"""
        return self.serializers.get(self.action, self.serializers['DEFAULT'])
