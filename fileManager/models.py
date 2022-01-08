from django.db import models
from django.conf import settings
from user_auth.models import User


def content_file_name(instance, filename):
    return 'content/ {0}/{1}'.format(instance.owner, filename)

class File(models.Model):
    name = models.CharField(max_length=120, blank=True)
    completed = models.BooleanField(default=False)
    data_create = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='uploaded_files', on_delete=models.CASCADE)    
    file = models.FileField(upload_to=content_file_name)

