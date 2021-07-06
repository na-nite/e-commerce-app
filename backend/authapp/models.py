from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):

    CHOICES = (
        ('Recruiter', 'Recruiter'),
        ('Condidat', 'Condidat'),
       )

    email = models.EmailField(verbose_name='email',max_length=255 , unique=True)
    fullname = models.CharField(max_length=255)
    type = models.CharField(max_length=300, choices = CHOICES)
    REQUIRED_FIELDS = ['username','fullname','type']
    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.username
