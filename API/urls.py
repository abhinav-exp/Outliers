from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path("", req),
    path('liststudents', liststudents),
    path('listnotice', listnotice),
    path('sign_up', sign_up),
    path('log_in', log_in),
    path('edit_students', editstudent),
]