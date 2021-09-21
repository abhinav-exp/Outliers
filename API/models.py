from typing import Text
from django.db import models
from django.template.response import TemplateResponse

# Create your models here.
class students(models.Model):
    firstnm = models.CharField(max_length=20)
    lastnm = models.CharField(max_length=20)
    email = models.EmailField(null= True)
    roll = models.CharField(max_length=10)
    passwd = models.CharField(max_length=40)
    cgpa = models.FloatField()
    address = models.CharField(max_length=200, default="")
    city = models.CharField(max_length=30, default="")
    state = models.CharField(max_length=30, default="")
    contact = models.IntegerField(default=9999999999)

    def __str__(self):
        return str(self.firstnm) + " " + str(self.email) + " " + str(self.roll)

class notice(models.Model):
    Date = models.DateField()
    Text = models.CharField(max_length=1000)
    Posted_by = models.ForeignKey(students, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.Date)+" "+str(self.Text)+" "+str(self.Posted_by)

class achievements(models.Model):
    student = models.ForeignKey(students, on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(max_length=200)

class poll_ques(models.Model):
    text = models.CharField(max_length=300)
    posted_by = models.ForeignKey(students, on_delete=models.CASCADE)

class poll_vote(models.Model):
    ques = models.ForeignKey(poll_ques, on_delete=models.CASCADE)
    voted_by = models.ForeignKey(students, on_delete=models.CASCADE)
    vote = models.BooleanField()

class tasks(models.Model):
    text = models.CharField(max_length=300)
    student = models.ForeignKey(students, on_delete=models.CASCADE)
    is_completed = models.BooleanField()
    date = models.DateField()