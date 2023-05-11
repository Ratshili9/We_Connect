from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .forms import ChatForm
from .models import Chat
from .serializers import ChatSerializer

# Create your views here.

def Home(request, *args, **kwargs):
    return render(request, "pages/home.html", context={}, status=200)

@api_view(['POST']) # http method the client == POST
def create_view(request, *args, **kwargs):
    serializer = ChatSerializer(data=request.POST)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data)
    return  Response({}, status=400)

def detail_view(request, *args, **kwargs):
    pass

def list_view(request, *args, **kwargs):
    serializer = ChatSerializer(many=True)
    return  Response(serializer.data, status=200)