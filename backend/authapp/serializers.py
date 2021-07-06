from rest_framework import serializers
from .models import *
from djoser.serializers import UserSerializer , UserCreateSerializer

class UserCreateSerializer(UserCreateSerializer):
    class Meta :
        model = User
        fields = ('id', 'email' ,'fullname','type','username','password')