from djongo import models

# Create your models here.

class Booth(models.Model):
    _id = models.ObjectIdField()
    name = models.TextField()
    club = models.TextField()
    message = models.TextField()
    code = models.TextField()
    busy = models.IntegerField()