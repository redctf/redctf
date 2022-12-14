from django.db import models
from teams.models import Team
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    verified = models.BooleanField(default=False)
    team = models.ForeignKey(Team, default=None, null=True, related_name='users', on_delete=models.SET_NULL)
    username = models.CharField(max_length=150, unique=True)
    hidden = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)