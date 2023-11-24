from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")


    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)

        if valid:
            username = self.validated_data["username"]
            if User.objects.filter(username=username).exists():
                self._errors["username"] = ["username already exists"]
                valid = False

        return valid

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","email")


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id
        print("Data in customtokenobtainpairserializer: ", data)
        return data


class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        if attrs["refresh"]:
            print("attrs in jwttokenrefreshserializer: ", attrs)
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")
