import os
from django.db import models
from django.conf import settings
from django.dispatch import receiver



def content_file_name(instance, file):
    return 'content/{0}/{1}'.format(instance.owner, file)

class File(models.Model):
    name = models.CharField(max_length=500, blank=True)
    completed = models.BooleanField(default=False)
    data_create = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='uploaded_files', on_delete=models.CASCADE)    
    file = models.FileField(upload_to=content_file_name)

class Filefirebase(models.Model):
    name = models.CharField(max_length=500, blank=True)
    completed = models.BooleanField(default=False)
    data_create = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='uploaded_files_firebase', on_delete=models.CASCADE,  null=True)    
    file_uri = models.CharField(max_length=500, blank=True)

@receiver(models.signals.post_delete, sender=File)
def auto_delete_file_on_delete(sender, instance, **kwargs):

    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

@receiver(models.signals.pre_save, sender=File)
def auto_delete_file_on_change(sender, instance, **kwargs):

    if not instance.pk:
        return False

    try:
        old_file = File.objects.get(pk=instance.pk).file
    except File.DoesNotExist:
        return False

    new_file = instance.file
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
