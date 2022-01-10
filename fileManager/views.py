from django.db.models.fields.files import FileField
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from django.http import FileResponse, HttpResponse
from rest_framework import status
from rest_framework import parsers, renderers
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, \
    RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators import action
from wsgiref.util import FileWrapper

from user_auth.permissions import *
from .serializers import *
from .models import *

# Create your views here.


class FileViewSet(ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]
    filter_fields =  ('completed',)
    ordering  = ('-date_created',)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        author_queryset = self.queryset.filter(owner=self.request.user)
        return author_queryset

class FileDetail(RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    parsers_classes = (FormParser, MultiPartParser,)
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class FileDownloadListAPIView(ListAPIView):

    def get(self, request, pk,  format=None):
        queryset = File.objects.get(id=pk)
        file_handle = queryset.file.path
        document = open(file_handle, 'rb')
        response = HttpResponse(FileWrapper(document), content_type='application/msword')
        response['Content-Disposition'] = 'attachment; filename="%s"' % queryset.file.name
        return response
