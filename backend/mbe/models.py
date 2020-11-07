from django.db import models

# Create your models here.
class Stock(models.Model):
    ticker = models.CharField(max_length=4, primary_key=True)
    companyName = models.CharField(max_length=60)
    currentPrice = models.DecimalField(max_digits=10, decimal_places=2)
    Market = models.CharField(max_length=60)


class StockEOD(models.Model):
    # Django adds AutoField to hold primary key if unspecified 
    ticker = models.ForeignKey(Stock, on_delete=models.CASCADE)
    EODPrice = models.DecimalField(max_digits=10, decimal_places=2)
    Date = models.DateField()
    
class StockCollection(models.Model):
    # not sure what this is supposed to do, but it was in the ER diagram
    ticker = models.CharField(max_length=4, primary_key=True)
    numShares = models.IntegerField()
    
class User(models.Model):
    # arbitrary max length choices, but I think we need to set them for SQL
    userID = models.IntegerField(primary_key=True)
    Username = models.CharField(max_length=20)
    Password = models.CharField(max_length=60)
    Email = models.CharField(max_length=60)
    
class Portfolio(models.Model):
    portfolioID = models.IntegerField(primary_key=True)
    totalValue = models.DecimalField(max_digits=10, decimal_places=2)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
