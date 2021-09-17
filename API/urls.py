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
    path('get_by_roll', get_by_roll),
    path('get_by_id/<int:id>', get_by_id),
    # path('create_poll'),
    # path('view_poll'),
    # path('vote/<int:id>'),
]