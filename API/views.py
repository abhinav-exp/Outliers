from django.http.response import HttpResponse
from django.shortcuts import render
from .models import *
from .serializers import StudentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import date


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
        if len(obj['arch']) == 0:
            obj['arch'] = [""]*5 
        res.append(obj)
    #print(res)
    return Response(res)

@api_view(['GET'])
def listnotice(request):
    notices = notice.objects.all()
    res = []
    for n in notices:
        r = {
            'id' : n.id,
            'date' : str(n.Date),
            'text' : n.Text,
            'posted_by' : str(n.Posted_by.firstnm) + " " + str(n.Posted_by.lastnm)
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
        return Response({'api_status' : 601})
    if not email[2:4] == '19':
        return Response({'api_status':602})
    if not email[0].lower() == 'b':
        return Response({'api_status':603})
    if not email[1].lower() == '5':
        return Response({'api_status':604})
    if int(email[4:7]) > 100:
        return Response({'api_status':605})
    
    try :
        s = students.objects.get(email = email.lower())
        return Response({'api_status':606})
    
    except students.DoesNotExist :
        s = students(firstnm = Firstnm, lastnm = Lastnm, email = email.lower(),
            roll = email[:7], passwd = passwd, cgpa = 0)
        s.save()
        for a in range(5):
            b = achievements(student = s)
            b.save()
        return Response({'api_status':700, "id": s.id})

@api_view(['POST'])
def log_in(request):
    email = request.data['email'].lower()
    passwd = request.data['password']

    if not (email[-14:] == '@iiit-bh.ac.in' and len(email) == 21):
        return Response({'api_status' : 601})
    if not email[2:4] == '19':
        return Response({'api_status':602})
    if not email[0].lower() == 'b':
        return Response({'api_status':603})
    if not email[1].lower() == '5':
        return Response({'api_status':604})
    if int(email[4:7]) > 100:
        return Response({'api_status':605})
    
    try :
        s = students.objects.get(email = email.lower())
        if s.passwd == passwd:
            return Response({'api_status':700, "id": s.id})
        else :
            return Response({'api_status':607})        

    except students.DoesNotExist :
        return Response({'api_status':606})

import json

@api_view(['POST'])
def editstudent(request):

    first = request.data['first']
    last = request.data['last']
    email = request.data['email'].lower()
    cgpa = request.data['cgpa']
    address = request.data['address']
    city = request.data['city']
    state = request.data['state']
    contact = request.data['contact']

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
    s.address = address
    s.city = city
    s.state = state
    s.contact = contact
    s.save()
    for a in arch:
        ar = achievements(student = s, text = a)
        ar.save()
    return Response({
        'api_status' : 700
    })

@api_view(['GET'])
def get_by_roll(request):
    roll = request.GET['roll'].lower()
    s = students.objects.get(roll = roll)
    obj = {
            'first' : s.firstnm, 
            'last' : s.lastnm ,
            'email' : s.email,
            'roll' : s.roll ,
            'cgpa' : s.cgpa ,
            'address' : s.address,
            'city' : s.city,
            'state' : s.state,
            'contact' : s.contact,
            'arch' : []
        }
    for arc in achievements.objects.filter(student = s):
            obj['arch'].append(arc.text)
    
    return Response(obj)

@api_view(['GET'])
def get_by_id(request, id):
    s = students.objects.get(id = id)
    obj = {
            'first' : s.firstnm, 
            'last' : s.lastnm ,
            'email' : s.email,
            'roll' : s.roll ,
            'cgpa' : s.cgpa ,
            'address' : s.address,
            'city' : s.city,
            'state' : s.state,
            'contact' : s.contact,
            'arch' : []
        }
    for arc in achievements.objects.filter(student = s):
        obj['arch'].append(arc.text)
    if len(obj['arch']) == 0:
        obj['arch'] = [""]*5 
    
    return Response(obj)

@api_view(['POST'])
def create_poll(request):
    text = request.data['text']
    posted_by_id = int(request.data['student_id'])

    obj = poll_ques(text = text, posted_by = students.objects.get(id = posted_by_id))
    obj.save()
    
    return Response({'api_status':700, 'ques_id':obj.id})

@api_view(['GET'])
def view_poll(request):
    res = []
    for o in poll_ques.objects.all():
        obj = {
            'id':o.id,
            'text':o.text,
            'posted_by_id':o.posted_by.id,
            'yes_votes':len( poll_vote.objects.filter(ques = o, vote = True) ),
            'no_votes':len( poll_vote.objects.filter(ques = o, vote = False) ),
        }
        res.append(obj)
    return Response(res)

@api_view(['GET'])
def list_poll(request):
    student_id = request.GET['student_id']
    s = students.objects.get(id = student_id)
    res = []
    for o in poll_ques.objects.all():
        obj = {
            'id':o.id,
            'text':o.text,
            'posted_by_id':o.posted_by.id,
            'yes_votes':len( poll_vote.objects.filter(ques = o, vote = True) ),
            'no_votes':len( poll_vote.objects.filter(ques = o, vote = False) ),
        }
        try :
            vot = poll_vote.objects.get(ques = o, voted_by = s)
            obj['voted'] = True
            obj['vote'] = vot.vote
        except :
            obj['voted'] = False
            obj['vote'] = -1
        res.append(obj)
    return Response(res)

@api_view(['GET'])
def check_vote(request):
    student_id = request.GET['student_id']
    poll_id = request.GET['poll_id']
    try :
        vot = poll_vote.objects.get(ques = poll_ques.objects.get(id = poll_id),
            voted_by = students.objects.get(id = student_id))
        return Response({
            'voted' : True,
            'vote' : vot.vote
        })
    except:
        return Response({
            'voted' : False
        })

@api_view(['GET'])
def vote(request):
    student_id = request.GET['student_id']
    poll_id = request.GET['poll_id']
    vote = bool(request.GET['vote'] == '1')
    try : 
        vot = poll_vote.objects.get(ques = poll_ques.objects.get(id = poll_id),
            voted_by = students.objects.get(id = student_id))
        return Response({'api_status':600})
    except : 
        v = poll_vote(ques = poll_ques.objects.get(id = poll_id),
            voted_by = students.objects.get(id = student_id),
            vote = vote)
        v.save()
        return Response({'api_status':700})


@api_view(['GET'])
def get_tasks(request):
    student_id = request.GET['student_id']
    s = students.objects.get(id = student_id)
    l = tasks.objects.filter(student = s).order_by('is_completed')
    res = []
    for o in l:
        obj = {
            'id':o.id,
            'text' : o.text,
            'is_completed' : o.is_completed,
            'date': str(o.date)[8:] + "-" + str(o.date)[5:7] + "-" + str(o.date)[:4]
        }
        res.append(obj)
    return Response(res)

@api_view(['POST'])
def create_tasks(request):
    student_id = request.data['student_id']
    s = students.objects.get(id = student_id)
    text = request.data['text']
    dat = request.data['date']
    dobj = date(int(dat[6:]),int(dat[3:5]), int(dat[:2]) )
    obj = tasks(student = s, text = text, is_completed = False, date = dobj)
    obj.save()
    return Response({'api_status':700, 'task_id':obj.id})

@api_view(['GET'])
def complete_task(request):
    task_id = request.GET['task_id']
    t = tasks.objects.get(id = task_id)
    t.is_completed = True
    t.save()
    return Response({'api_status':700, 'task_id':t.id})

@api_view(['GET'])
def delete_task(request):
    task_id = request.GET['task_id']
    tasks.objects.filter(id = task_id).delete()
    return Response({'api_status':700})

@api_view(['POST'])
def create_notice(request):
    student_id = request.data['student_id']
    text = request.data['text']
    notic = notice(Date = date.today(), Text = text, Posted_by = students.objects.get(id = student_id))
    notic.save()
    return Response({
        'api_status':700,
        'id':notic.id
    })

@api_view(['GET'])
def delete_notice(request):
    notice_id = request.GET['notice_id']
    notice.objects.filter(id = notice_id).delete()
    return Response({'api_status':700})

@api_view(['POST'])
def edit_notice(request):
    notice_id = request.data['notice_id']
    text = request.data['text']
    notic = notice.objects.get(id = notice_id)
    notic.Text = text
    notic.save()
    return Response({'api_status':700})