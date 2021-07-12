import pymongo
from . import MongoDBManager
from pymongo.database import Database
import numpy as np


Database = MongoDBManager()['clubfestival']

class Recommend(object):

    def __init__():
        cor = getCorr(Database)
        fin = getResult(cor)
        return fin

    def getCorr(data):
        #데이터를 행렬로 변환해줘야함
        corr = np.corrcoef(data)
        corr2 = corr[:200, :200]

        return corr2

    def getResult(cor):
        
        booth_name = []#데이터 가져오기
        booth_name_list = list(booth_name)
        coffey_hands = booth_name_list.index("원하는 데이터") #부스 이름을 입력받음

        corr_coffey_hands  = cor[coffey_hands]
        result = list(booth_name[(corr_coffey_hands >= 0.9)])[:50]
        
        return result
