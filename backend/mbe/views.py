from django.shortcuts import render

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from .models import Stock, StockEOD
from .serializers import StockSerializer, StockEODSerializer

# Create your views here.

class StockViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Stock.objects.all()
        tickers = self.request.query_params.get('ticker', None)
        print(tickers)
        if tickers is not None and tickers != "":
            queryset = Stock.objects.filter(ticker__icontains=tickers)
        return queryset

class StockEODViewSet(viewsets.ModelViewSet):
    queryset = StockEOD.objects.all()
    serializer_class = StockEODSerializer
    permission_classes = [AllowAny]
