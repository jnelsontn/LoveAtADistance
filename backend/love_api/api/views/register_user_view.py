from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from django.http import HttpResponse
from api.methods import ListToDict
from api.models import Profile
from itertools import chain
import json

@csrf_exempt
def register_user(request):
    '''Handles the creation of a new user for authentication

    Method arguments:
      request -- The full HTTP request object
    '''

    # Load the JSON string of the request body into a dict
    req_body = json.loads(request.body.decode())

    # Create a new user by invoking the `create_user` helper method
    # on Django's built-in User model
    new_user = User.objects.create_user(
                    username=req_body['username'],
                    password=req_body['password'],
                    email=req_body['email'],
                    first_name=req_body['first_name'],
                    last_name=req_body['last_name'],
                    )

    # Commit the user to the database by saving it
    new_user.save()

    # Use the REST Framework's token generator on the new user account
    token = Token.objects.create(user=new_user)
    created_user = token.user_id

    #user_fields = Profile.user.get_queryset().filter(id=created_user).values( 'id', 'username', 'first_name', 'last_name', 'email' )
    profile_fields = Profile.objects.filter(user_id=created_user).values( 'bio', 'city', 'state', 'country', 'birth_date', 'phone_number' )
    #combine_user_fields = list(chain(user_fields, profile_fields))
    profile = ListToDict(profile_fields)

    serializer_context = {'request': request }
    user_serializer = UserSerializer(new_user, context=serializer_context).data

    # Return the token to the client
    data = json.dumps({'token':token.key, 'user': user_serializer, 'profile': profile})
    return HttpResponse(data, content_type='application/json')



