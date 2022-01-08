# from django.views.generic.list import T
from rest_framework import serializers
# from django.contrib.auth import authenticate

from .models import *

class FileSerializer(serializers.ModelSerializer):
    
    file = serializers.FileField(max_length=120)

    class Meta:
        model = File
        fields = ('id', 'name', 'data_create', 'file')