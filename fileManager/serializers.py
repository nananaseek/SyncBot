from rest_framework import serializers

from .models import *


class FileSerializer(serializers.ModelSerializer):
    
    file = serializers.FileField(max_length=500)

    class Meta:
        model = File
        fields = ('id', 'name', 'data_create', 'file')

class FireBaseSerializer(serializers.ModelSerializer):
    
    file_uri = serializers.CharField(max_length=500)

    class Meta:
        model = Filefirebase
        fields = ('id', 'name', 'data_create', 'file_uri')