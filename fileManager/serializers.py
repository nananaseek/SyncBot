from rest_framework import serializers

from .models import *


class FileSerializer(serializers.ModelSerializer):
    
    filename = serializers.FileField(max_length=120)

    class Meta:
        model = File
        fields = ('id', 'name', 'data_create', 'filename')

class FireBaseSerializer(serializers.ModelSerializer):
    
    filename = serializers.FileField(max_length=120)

    class Meta:
        model = File
        fields = ('id', 'name', 'data_create', 'filename')