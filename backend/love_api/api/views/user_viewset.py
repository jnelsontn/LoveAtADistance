from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.serializers import *
from api.models import *

class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users or...
    requesting the current user object.
    """
    queryset = User.objects.all()
    # serializer_class = UserSerializer
    serializers = {
        'DEFAULT': UserSerializer,
        'PARTNER': PartnerSerializer,
    }

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

    def get_serializer_class(self):
        try:
            # i have sent a request and have a partner... good
            sent_relationship = Relationship.objects.get(user=self.request.user.id).partner.id

            if type(sent_relationship == int):
                # have they given us a relationship??????
                try:
                    do_we_have_a_partner = Relationship.objects.filter(
                        user=sent_relationship, partner=self.request.user.id).values_list(
                        'user', 'partner').order_by('id')

                    partner_id = do_we_have_a_partner[0][0]

                    if sent_relationship == partner_id:
                        return self.serializers.get(self.action, self.serializers['PARTNER'])

                except:
                    pass
        except:
            pass

        return self.serializers.get(self.action, self.serializers['DEFAULT'])
