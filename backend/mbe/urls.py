from django.urls import include, path
from . import views
from rest_framework.routers import SimpleRouter

stockRouter = SimpleRouter()
stockRouter.register(r'Stocks', views.StockViewSet, basename='Stock')

stockEODRouter = SimpleRouter()
stockEODRouter.register(r'StockEODs', views.StockEODViewSet, basename='StockEOD')

urlpatterns = [
    path('', include(stockRouter.urls)),
    path('', include(stockEODRouter.urls))
]
