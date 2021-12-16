from django.urls import path
from .views import CreatePlotView, ListPlotView, RetrievePlotView

urlpatterns = [
    path('plot/create/', CreatePlotView.as_view(), name='create_plot'),
    path('plot/list/', ListPlotView.as_view(), name='plot_list'),
    path('plot/<int:pk>/retrive/', RetrievePlotView.as_view(), name='retrive_plot'),
]
