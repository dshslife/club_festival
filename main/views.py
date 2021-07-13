from django.shortcuts import render, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from .utils import MongoDBManager
from pymongo.database import Database
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator
from webpush import send_user_notification
from django.contrib import auth
from django.contrib.auth.models import User
from webpush import send_group_notification
# Create your views here.
import pymongo

import collections
db: Database = MongoDBManager()['clubfestival']

def objectIdDecoder(list):
  results=[]
  for document in list:
    document['_id'] = str(document['_id'])
    results.append(document)
  return results


def initNewUser(code):
  try:
    db['users'].insert({
    'code': code,
    'booth': [],
    'point': 0})
  except Exception as e:
    print(e)
    return False
  return True

from bson.objectid import ObjectId

def logout(request):
  auth_logout(request)
  return redirect('/')

def test(request):
  if request.method == "POST":
    user = auth.authenticate(request, username=request.POST['code'], password='ghkdtjdtlr')
    if user is not None:
      auth.login(request, user)
      return redirect('/')
    else:
      return render(request, 'index.html', {'webpush': {'group': 'startup'}, 'error': '올바르지 않은 코드입니다'})
  else:
    return render(request, 'index.html', {'webpush': {'group': 'startup'}})

# 메인페이지
def index(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    else:
        rep = db['users'].find_one({'code': request.user.email})
        print(request.user.email)
        if not rep:
            initNewUser(request.user.email)
            request.session['_id'] = str(db['users'].find_one({'code': request.user.email})['_id'])
            print("INIT NEW USER")
        if not '_id' in request.session:
            request.session['_id'] = str(db['users'].find_one({'code': request.user.email})['_id'])
        rep = db['users'].find_one({'code': request.user.email})
        booth = db['booth'].find({}).sort('busy', 1)
        booth = booth[:10]
        import random
        random.shuffle(list(booth))
        return render(request, "Menu.html", {"user": rep, "recommendBooth": booth[:3]})

@login_required(login_url="/")
def BoothInfo(request):
    booth = db['booth'].find({}).sort('busy', 1)
    result_booth = []
    for i in booth:
        i['id'] = str(i['_id'])
        result_booth.append(i)
    print(result_booth)
    return render(request, "Booth.html", {'booth': objectIdDecoder(result_booth)})

@login_required(login_url="/")
def RankingView(request):
    rank = db['users'].find({}).sort('point', pymongo.DESCENDING)
    result = []
    for i, user in enumerate(rank):
        user['rank'] = i + 1
        result.append(user)
        if user['code'] == request.user.email:
            selfUser = user
    print(result)
    return render(request, "Ranking.html", {'selfuser': selfUser, 'result': objectIdDecoder(result)})

@login_required(login_url="/")
def MapView(request):
    booth = db['booth'].find({})
    result_booth = []
    for i in booth:
        i['id'] = str(i['_id'])
        result_booth.append(i)
    return render(request, "Map.html", {'booth': objectIdDecoder(result_booth)})

@login_required(login_url="/")
def HistoryView(request):
  rep = db['users'].find_one({'code': request.user.email})
  visited_booth = db['users'].aggregate([
    {
      "$match": {
        "code": request.user.email,
      },
    },
    {
      "$lookup": {
        "from": "booth",
        "let": {"id": "$booth"},
        "pipeline": [
          {
            "$match": {
              "$expr": {
                "$in": ["$_id","$$id"]
              }
            }
          }
        ],
        "as": "res"
      }
    },
    {
        "$unwind": "$res"
    },
    {
        "$project":{
            "name": "$res.name",
            "code": "$res.code",
            "busy": "$res.busy"
        }
    }
  ]
  )

  print(visited_booth)

  return render(request, "History.html", {"score": rep['point'], "visited_booth": objectIdDecoder(visited_booth)})

class CategorySelect(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super(CategorySelect, self).dispatch(request, *args, **kwargs)

  def get(self, request):
    return render(request, "Select.html")

  def post(self, request):
    if request.POST == None:
      return HttpResponse(status=400)
    else:
      try:
        print(request.POST)
        data = request.POST
        db['users'].update_one({'code': request.user.email}, {'$set': {'category': request.POST['category'] }})
        return HttpResponse(status=200)
      except Exception as e:
        print(e)



class BoothCheck(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super(BoothCheck, self).dispatch(request, *args, **kwargs)
  def post(self, request):
    if request.body == None:
      return HttpResponse(status=400)
    else:
      try:
        data = json.loads(request.body)
        print(data)
        if not 'code' in data and 'point' in data and not 'booth' in data:
          return JsonResponse(status=400, data={'status': 'NO_CODE_ERROR'})
        if 'booth' in data:
          booth = db['booth'].find_one({'code': data['booth']})
          if booth == None:
            return JsonResponse(status=400, data={ 'status': 'NO_BOOTH_ERROR'})
          usertmp = dict(db['users'].find_one({'code': data['code']}))
          if usertmp == None:
            return JsonResponse(status=400, data={ 'status': 'NOT_FOUND_USER_ERROR'})
          else:
            if booth['_id'] in usertmp['booth']:
              return JsonResponse(status=400, data={ 'status': 'ALREADY_EXPERIENCED'})
            db['users'].update_one({'code': data['code']},{'$push': {'booth': booth['_id']}, '$set': {'point': usertmp['point'] + data['point']}})
        return HttpResponse(status=200)
      except Exception as e:
        return JsonResponse(status=500, data={'error': str(e)})

from django.contrib.auth import get_user_model

from webpush import send_user_notification

class WebPush(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super(WebPush, self).dispatch(request, *args, **kwargs)

  def post(self, request):
    if request.body == None:
      return HttpResponse(status=404)
    else:
      data = json.loads(request.body)
      User = get_user_model()
      users = User.objects.all()
      print(data)
      payload = {"head": data['title'], "icon": "https://i.imgur.com/EqNRGOC.png", "url": "https://meetstartup.today", "body": data['message']}
      for user in users:
        send_user_notification(user=user ,payload=payload, ttl=1000)
      return HttpResponse(status=200)

class BoothList(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super(BoothList, self).dispatch(request, *args, **kwargs)
  
  def get(self, request):
    data = list(db['booth'].find({}).sort('busy', 1))
    return JsonResponse(status=200, data=objectIdDecoder(data), safe=False)

class setBoothBusy(View):
  @method_decorator(csrf_exempt)
  def dispatch(self, request, *args, **kwargs):
    return super(setBoothBusy, self).dispatch(request, *args, **kwargs)
  
  def post(self, request):
    if request.body == None:
      return HttpResponse(status=400)
    data = json.loads(request.body)
    if not 'code' in data or not 'busy' in data:
      return HttpResponse(status=403)
    else:
      print(list(db['booth'].find({'code' : ObjectId(data['code']) })))
      db['booth'].update_one({'code': ObjectId(data['code'])}, {'$set': {'busy': data['busy']}})

      return HttpResponse(status=200)