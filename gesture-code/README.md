# kmfd_gesture
Reads APDS9660 module and stores the gesture into mosquitto MQTT broker for KMFD React app to read

# KMFD React demonstration app
https://github.com/rdoetjes/kfmd

# Change configuration
For the sake of code brevity, for the video, I hardcoded the username/password and hostname to the broker. There for you will need to edit the Gesture.cpp file and cnage hostname, username and passaord to suit yuor mosquitto.conf

# Connections from Module to PI
**APDS9660**    **Pi**<br/>
VCC   ->      01<br>
SCL   ->      05<br/>
SDA   ->      03<br/>
INT   ->      07<br/>
GND   ->      09<br/>

# starting
To run
```
./start.sh
```
This will set pin 07 to interrupt with the command
```
sudo gpio edge 7 falling
```
