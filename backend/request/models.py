from django.db import models

class Request_item(models.Model):
    amount = models.IntegerField()
    plastic = models.ForeignKey('plastic.Plastic', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.plastic.name} - {self.amount}"


class Request(models.Model):

    status_choices = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )


    sender = models.ForeignKey('user.User', on_delete=models.PROTECT)
    receiver = models.ForeignKey('company.Company', on_delete=models.PROTECT)
    items = models.ForeignKey(Request_item, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=status_choices, default='pending')
    request_accepted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} - {self.receiver}- {self.created_at}"
