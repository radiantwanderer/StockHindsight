from django.urls import include, path
from . import views
from rest_framework.routers import SimpleRouter

stockRouter = SimpleRouter()
stockRouter.register("Stocks", views.StockViewSet)

stockEODRouter = SimpleRouter()
stockEODRouter.register("StockEODs", views.StockEODViewSet)

urlpatterns = [
    path('', include(stockRouter.urls)),
    path('', include(stockEODRouter.urls))
]
