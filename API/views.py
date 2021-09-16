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
    #print(res)
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
    #print(res)
    return Response(res)

@api_view(['POST'])
def sign_up(request):
    Firstnm = request.data['first']
    Lastnm = request.data['last']
    email = request.data['email'].lower()
    passwd = request.data['password']

    if not (email[-14:] == '@iiit-bh.ac.in' and len(email) == 21):
        return Response({'api status' : 601})
    if not email[2:4] == '19':
        return Response({'api status':602})
    if not email[0].lower() == 'b':
        return Response({'api status':603})
    if not email[1].lower() == '5':
        return Response({'api status':604})
    if int(email[4:7]) > 100:
        return Response({'api status':605})
    
    try :
        s = students.objects.get(email = email.lower())
        return Response({'api status':606})
    
    except students.DoesNotExist :
        s = students(firstnm = Firstnm, lastnm = Lastnm, email = email.lower(),
            roll = email[:7], passwd = passwd, cgpa = 0)
        s.save()
        return Response({'api status':700})

def log_in(request):
    email = request.data['email'].lower()
    passwd = request.data['password']

    if not (email[-14:] == '@iiit-bh.ac.in' and len(email) == 21):
        return Response({'api status' : 601})
    if not email[2:4] == '19':
        return Response({'api status':602})
    if not email[0].lower() == 'b':
        return Response({'api status':603})
    if not email[1].lower() == '5':
        return Response({'api status':604})
    if int(email[4:7]) > 100:
        return Response({'api status':605})
    
    try :
        s = students.objects.get(email = email.lower())
        if s.passwd == passwd:
            return Response({'api status':700})
        else :
            return Response({'api status':607})        

    except students.DoesNotExist :
        return Response({'api status':606})

import json

@api_view(['POST'])
def editstudent(request):

    first = request.data['first']
    last = request.data['last']
    email = request.data['email'].lower()
    cgpa = request.data['cgpa']

    #arch = json.loads(request.POST)['arch']
    #arch = request.POST.getlist('arch')
    arch = request.data.get('arch')
    # print(request.POST)
    # print(arch)
    # print(type(arch))
    s = students.objects.get(email = email.lower())
    achievements.objects.filter(student = s).delete()
    s.firstnm = first
    s.lastnm = last
    s.cgpa = cgpa
    s.save()
    for a in arch:
        ar = achievements(student = s, text = a)
        ar.save()
    return Response({
        'api status' : 700
    })

