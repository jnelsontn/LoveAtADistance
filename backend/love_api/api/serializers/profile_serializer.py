from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.HyperlinkedModelSerializer):

    #profile = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    #profile = serializers.PrimaryKeyRelatedField( many=True,  queryset=User.objects.all()  )

    class Meta:
        model = Profile
        fields = '__all__'

    #When a User is created, create their Profile too
    # def update(self, instance, data):
    #     instance = super(UserSerializer, self).update(instance, data)
    #     instance.save()

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        exclude = ()


