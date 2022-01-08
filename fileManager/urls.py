from django.urls import path, include

from .views import *

vi = FileViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('', vi),
    path('<int:pk>/', FileDetail.as_view()),

]