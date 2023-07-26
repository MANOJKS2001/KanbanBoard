from django.urls import path
from .views import ApiOverview, UserList, UserDetail, UserCreate, UserUpdate, UserDelete
from .views import BoardList, BoardDetail, BoardCreate, BoardUpdate, BoardDelete
from .views import CardList, CardDetail, CardCreate, CardUpdate, CardDelete
from .views import ListList, ListDetail, ListCreate, ListUpdate, ListDelete


urlpatterns = [
path('api-overview/', ApiOverview.as_view(), name='api-overview'),

#users urls
path('user-list/', UserList.as_view(), name='user-list'),
path('user-detail/<int:pk>/', UserDetail.as_view(), name='user-detail'),
path('user-create/', UserCreate.as_view(), name='user-create'),
path('user-update/<int:pk>/', UserUpdate.as_view(), name='user-update'),
path('user-delete/<int:pk>/', UserDelete.as_view(), name='user-delete'),

#board urls
path('board-list/', BoardList.as_view(), name='board-list'),
path('board-detail/<int:pk>/', BoardDetail.as_view(), name='board-detail'),
path('board-create/', BoardCreate.as_view(), name='board-create'),
path('board-update/<int:pk>/', BoardUpdate.as_view(), name='board-update'),
path('board-delete/<int:pk>/', BoardDelete.as_view(), name='board-delete'),

#card urls

path('card-list/', CardList.as_view(), name='card-list'),
path('card-detail/', CardDetail.as_view(), name='card-detail'),
path('card-create/', CardCreate.as_view(), name='card-create'),
path('card-update/<int:pk>/', CardUpdate.as_view(), name='card-update'),
path('card-delete/<int:pk>/', CardDelete.as_view(), name='card-delete'),

#list urls

path('list-list/', ListList.as_view(), name='list-list'),
path('list-detail/<int:pk>/', ListDetail.as_view(), name='list-detail'),
path('list-create/', ListCreate.as_view(), name='list-create'),
path('list-update/<int:pk>/', ListUpdate.as_view(), name='list-update'),
path('list-delete/<int:pk>/', ListDelete.as_view(), name='list-delete'),





]