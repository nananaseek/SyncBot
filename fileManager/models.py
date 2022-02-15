import os
from django.db import models
from django.conf import settings
from django.dispatch import receiver



def content_file_name(instance, filename):
    return 'content/{0}/{1}'.format(instance.owner, filename)

class File(models.Model):
    name = models.CharField(max_length=120, blank=True)
    completed = models.BooleanField(default=False)
    data_create = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='uploaded_files', on_delete=models.CASCADE)    
    filename = models.FileField(upload_to=content_file_name)

class Filefirebase(models.Model):
    name = models.CharField(max_length=120, blank=True)
    completed = models.BooleanField(default=False)
    data_create = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='uploaded_files_firebase', on_delete=models.CASCADE,  null=True)    
    filename = models.CharField(max_length=256, blank=True)

@receiver(models.signals.post_delete, sender=File)
def auto_delete_file_on_delete(sender, instance, **kwargs):

    if instance.filename:
        if os.path.isfile(instance.filename.path):
            os.remove(instance.filename.path)

@receiver(models.signals.pre_save, sender=File)
def auto_delete_file_on_change(sender, instance, **kwargs):

    if not instance.pk:
        return False

    try:
        old_file = File.objects.get(pk=instance.pk).filename
    except File.DoesNotExist:
        return False

    new_file = instance.filename
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
