from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

userList = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

app_name = 'user_auth'
urlpatterns = [
    path('user/', UserRetrieveUpdateAPIView.as_view()),
    re_path(r'^registration/?$', RegistrationAPIView.as_view(), name='user_registration'),
    re_path(r'^login/?$', LoginAPIView.as_view(), name='user_login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/list/reg/', userList),
    path('users/detail/<int:pk>', LoginDetailAPIView.as_view()),
]