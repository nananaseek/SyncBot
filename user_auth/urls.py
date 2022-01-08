from django.urls import path, include

from .views import *

userList = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

app_name = 'user_auth'
urlpatterns = [
    path('user/', UserRetrieveUpdateAPIView.as_view()),
    path('users/login/', LoginAPIView.as_view()),
    # path('logout/', Logout.as_view(), name='logout'),
    path('users/list/reg/', userList),
    path('users/detail/<int:pk>', LoginDetailAPIView.as_view()),
    # path('api-auth/', include('rest_framework.urls')),
]