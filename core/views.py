from django.shortcuts import render

# Create your views here.

def Home(request, *args, **kwargs):
    return render(request,"core/home.html")