from django.http.response import HttpResponse
from django.shortcuts import render
from .models import *
from .serializers import StudentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def req(request):
    return HttpResponse("hello api")

@api_view(['GET'])
def liststudents(request):
    #data = students.objects.all()
    #if data.is_valid():
    stu = students.objects.all()
    # ser = StudentSerializer(stu, many = True)
    # r =  Response(ser.data)
    # print(r)
    # return Response(r)
    #pass
    # except Car.DoesNotExist:
    # return HttpResponse(status=404)
    # else :
    #     pass

    res = []
    for s in stu:
        obj = {
            'first' : s.firstnm, 
            'last' : s.lastnm ,
            'roll' : s.roll ,
            'branch' : s.branch ,
            'cgpa' : s.cgpa ,
            'arch' : []
        }
        for arc in achievements.objects.filter(student = s):
            obj['arch'].append(arc.text)
        res.append(obj)
    print(res)
    return Response(res)

@api_view(['GET'])
def listnotice(request):
    notices = notice.objects.all()
    res = []
    for n in notices:
        r = {
            'date' : str(n.Date),
            'text' : n.Text
        }
        res.append(r)
    print(res)
    return Response(res)