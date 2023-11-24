from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=20)
    admin = models.ForeignKey('user.User', on_delete=models.PROTECT)

    def __str__(self):
        return self.name
