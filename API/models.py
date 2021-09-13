from django.db import models

# Create your models here.
class students(models.Model):
    firstnm = models.CharField(max_length=20)
    lastnm = models.CharField(max_length=20)
    email = models.EmailField(null= True)
    roll = models.CharField(max_length=10)
    branch = models.CharField(max_length=40)
    cgpa = models.FloatField()

class notice(models.Model):
    Date = models.DateField()
    Text = models.CharField(max_length=1000)
    Posted_by = models.CharField(max_length=50, blank=True)

class achievements(models.Model):
    student = models.ForeignKey(students, on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(max_length=200)