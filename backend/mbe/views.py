from django.shortcuts import render

from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Stock, StockEOD
from .serializers import StockSerializer, StockEODSerializer

# Create your views here.

class StockViewSet(ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [AllowAny]

class StockEODViewSet(ModelViewSet):
    queryset = StockEOD.objects.all()
    serializer_class = StockEODSerializer
    permission_classes = [AllowAny]