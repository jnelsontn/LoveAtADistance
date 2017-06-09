from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import UserSerializer
from api.methods import ListToDict
from api.models import Profile
import json

class ObtainUserToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # Token.objects.filter(user=the_user).delete()
        token, created = Token.objects.get_or_create(user=user)

        serializer_context = { 'request': request }
        user_serializer = UserSerializer(user, context=serializer_context).data

        userid = int(user.id)
        user_profile = Profile.objects.filter(user_id=userid).values(
            'user_id', 'bio', 'city', 'state', 'country', 'birth_date', 'phone_number')
        profile = ListToDict(user_profile)

        return Response({'token': token.key, 'user': user_serializer, 'profile': profile})

obtain_user_token = ObtainUserToken.as_view()





