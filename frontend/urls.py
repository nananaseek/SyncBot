from django.urls import re_path, path
from . import views

urlpatterns = [re_path("^((?!api|admin|swagger).)*$", views.index)]
