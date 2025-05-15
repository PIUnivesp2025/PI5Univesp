from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import serial # pip install pyserial

# Adjust the serial port and the baud rate
#serialCom = serial.Serial("COM3", 9600, timeout=1)

# Create your views here.
def index(request):
    return render(request, "energyManagement/index.html")

def loadOn(request):
    serialCom.write(b"1")
    return JsonResponse({"status": "Load turned on"})

def loadOff(request):
    serialCom.write(b"0")
    return JsonResponse({"status": "Load turned off"})

def presence(request):
    serialCom.flushInput()
    packet = ""
    data = ""
    packet = serialCom.readline()

    if packet != "":
        data = packet.decode("utf")
        # Remove new line charactere
        data = data.rstrip("\n")
        # Remove carriage return charactere?
        data = data.rstrip("\r")
        print(f"data: {data}")

    # In order to return a string, the parameter safe=False must be passed
    return JsonResponse(data, safe=False)