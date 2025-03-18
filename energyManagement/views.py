from django.shortcuts import render
# We have to install the library below with command pip install pyserial
import serial
from django.http import JsonResponse


# Start the serial communication adjusting its parameters
serialCom = serial.Serial("COM3", 9600, timeout=1)

# Create your views here.
def index(request):
    return render(request, "energyManagement/index.html")


def ledOn(request):
    serialCom.write(b"B")
    return JsonResponse({"status": "LED turned on"})


def ledOff(request):
    serialCom.write(b"b")
    return JsonResponse({"status": "LED turned off"})


def potenciometer(request):
    packet = ""
    data = ""
    serialCom.flushInput()
    packet = serialCom.readline()

    if packet != "":
        data = packet.decode("utf")
        # Remove new line character
        data = data.rstrip("\n")
        # Remove carriage return character
        data = data.rstrip("\r")
        print(f"data: {data}")

    # In order to return a string the parameter safe must be set to False
    return JsonResponse(data, safe=False)
