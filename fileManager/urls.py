from django.urls import path, include, re_path

from .views import *

vi = FileViewSet.as_view({
    'get': 'list',
})

urlpatterns = [
    path('', vi),
    path('<int:pk>/', FileDetail.as_view()),
    re_path(r'^upload/(?P<filename>[^/]+)$', FileUploadView.as_view({'post': 'create',})),
    re_path(r'^uploadf/', FileFireBaseUploadView.as_view({'post': 'create',})),
    path('download/<int:pk>/', FileDownloadListAPIView.as_view())

]