from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import  UserSerializer 
from .serializers import  BoardSerializer
from .serializers import  CardSerializer
from .serializers import  ListSerializer
from .models import User 
from .models import Board
from .models import Card
from .models import List 

class ApiOverview(APIView):
    def get(self, request):
        api_urls = {
        'List': '/user-list/',
        'Detail View': '/user-detail/<int:pk>/',
        'Create': '/user-create/',
        'Update': '/user-update/<int:pk>/',
        'Delete': '/user-delete/<int:pk>/',
        }
        return Response(api_urls)


#user views
class UserList(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return JsonResponse(serializer.data,  safe=False)

class UserDetail(APIView):
    def get(self, request, pk):
        user = User.objects.filter(user_id=pk)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserUpdate(APIView):
    def put(self, request, pk):
        user = User.objects.get(user_id=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_201_CREATED,safe = True)

class UserDelete(APIView):
    def delete(self, request, pk):
        user = User.objects.get(user_id=pk)
        user.delete()
        return Response('Item successfully deleted!')
    

#board views

class BoardList(APIView):
    def get(self, request):
        board = Board.objects.all()
        serializer = BoardSerializer(board, many=True)
        return JsonResponse(serializer.data,  safe=False)

class BoardDetail(APIView):
    def get(self, request, pk):
        board = Board.objects.filter(board_id=pk)
        serializer = BoardSerializer(board, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BoardCreate(APIView):
    def post(self, request):
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BoardUpdate(APIView):
    def put(self, request, pk):
        board = Board.objects.get(board_id =pk)
        serializer = BoardSerializer(board, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class BoardDelete(APIView):
    def delete(self, request, pk):
        board = Board.objects.get(board_id=pk)
        board.delete()
        return Response('Item successfully deleted!')
    

#Card views

class CardList(APIView):
    def get(self, request):
        card = Card.objects.all()
        serializer = CardSerializer(card, many=True)
        return JsonResponse(serializer.data,  safe=False)

class CardDetail(APIView):
    def get(self, request, pk):
        card = Card.objects.filter(card_id=pk)
        serializer = CardSerializer(card, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CardCreate(APIView):
    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CardUpdate(APIView):
    def put(self, request, pk):
        card = Card.objects.get(card_id=pk)
        serializer = CardSerializer(card, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_201_CREATED,safe = True)

class CardDelete(APIView):
    def delete(self, request, pk):
        card = Card.objects.get(card_id=pk)
        card.delete()
        return Response('Item successfully deleted!')
    

#List views

class ListList(APIView):
    def get(self, request):
        list = List.objects.all()
        serializer = ListSerializer(list, many=True)
        return JsonResponse(serializer.data,  safe=False)

class ListDetail(APIView):
    def get(self, request, pk):
        list = List.objects.filter(column_id=pk)
        serializer = ListSerializer(list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ListCreate(APIView):
    def post(self, request):
        serializer = ListSerializer(data=request.data)
        if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListUpdate(APIView):
    def put(self, request, pk):
        list = List.objects.get(column_id=pk)
        serializer = ListSerializer(list, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, safe = True)

class ListDelete(APIView):
    def delete(self, request, pk):
        list = List.objects.get(column_id=pk)
        list.delete()
        return Response('Item successfully deleted!')
    








