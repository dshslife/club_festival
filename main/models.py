from djongo import models
from django import forms
# Create your models here.

class Booth(models.Model):
    _id = models.ObjectIdField()
    name = models.TextField()
    club = models.TextField()
    message = models.TextField()
    code = models.TextField()
    busy = models.IntegerField()

    objects = models.DjongoManager()

class BoothLog(models.Model):
    name = models.TextField()
    code = models.TextField()
    date = models.DateTimeField()

    class Meta:
        abstract = True

class BoothLogForm(forms.ModelForm):
    class Meta:
        model = BoothLog
        

class User(models.Model):
    _id = models.ObjectIdField()
    award = models.BooleanField()
    bingo = models.ArrayField()

    objects = models.DjongoManager()