from rest_framework import serializers

from .models import Stock
from .models import StockEOD

class StockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'companyName', 'currentPrice', 'Market')
        
class StockEODSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StockEOD
        fields = ('ticker', 'Date', 'EODPrice')
