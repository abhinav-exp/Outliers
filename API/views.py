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
            'email' : s.email,
            'roll' : s.roll ,
            #'branch' : s.branch ,
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
            'text' : n.Text,
            'posted_by' : n.Posted_by
        }
        res.append(r)
    print(res)
    return Response(res)

@api_view(['POST'])
def sign_up(request):
    Firstnm = request.POST['first']
    Lastnm = request.POST['last']
    email = request.POST['email']
    passwd = request.POST['password']

    if not (email[-14:] == '@iiit-bh.ac.in' and len(email) == 21):
        return Response({'status' : 601})
    if not email[2:4] == '19':
        return Response({'status':602})
    if not email[:2].lower() == 'b5':
        return Response({'status':603})
    if int(email[4:7]) > 100:
        return Response({'status':604})
    
    if students.objects.get(email = email.lower()):
        
