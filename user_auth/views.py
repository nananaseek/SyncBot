from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, \
    RetrieveAPIView, GenericAPIView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken


from .permissions import *
from .serializers import *
from .models import *



class RegistrationAPIView(GenericAPIView):

    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class LoginDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser,)
    serializer_class = LoginSerializer


class LogoutAPIView(GenericAPIView) :
    serializer_class = LogoutSerializer
    pernission_classes = permissions.IsAuthenticated,

    def post(self, request):
        token = RefreshToken(request.data.get('refresh'))
        token.blacklist()
        return Response("Success")
        

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowPostAnyReadAuthenticatedUser,)

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return User.objects.all()
        return User.objects.filter(username=user.username)

    def get_object(self):
        obj = get_object_or_404(User.objects.filter(id=self.kwargs["pk"]))
        self.check_object_permissions(self.request, obj)
        return obj


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)