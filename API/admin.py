from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(students)
admin.site.register(achievements)
admin.site.register(notice)
admin.site.register(tasks)
admin.site.register(poll_ques)
admin.site.register(poll_vote)