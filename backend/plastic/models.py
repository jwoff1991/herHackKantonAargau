from django.db import models
from django.db.models.deletion import CASCADE


class Plastic(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Plastic_stock(models.Model):
    plastic = models.ForeignKey(Plastic, on_delete=models.CASCADE)
    company = models.ForeignKey('company.Company', on_delete=models.CASCADE)
    stock = models.IntegerField()

    def __str__(self):
        return self.plastic.name
