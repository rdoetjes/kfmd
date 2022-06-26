#include <iostream>
#include "APDS9960_RPi.h"
#include <mosquitto.h>

using namespace std;

// Pins
#define APDS9960_INT 7 // Needs to be an interrupt pin

// Constants

// Global Variables
APDS9960_RPi apds = APDS9960_RPi();
int isr_flag = 0;

// function declarations
void interruptRoutine();
void handleGesture(mosquitto *mosq);
int connectMqtt(struct mosquitto *mosq, const char* host, const int port, const int clean_session, const char* username, const char* password);

int connectMqtt(struct mosquitto *mosq, const char* host, const int port, const int clean_session, const char* username, const char* password){
	int keepalive = 60;
        mosquitto_lib_init();

        if(!mosq){
                fprintf(stderr, "Error: Out of memory.\n");
                return 1;
        }

        if(mosquitto_username_pw_set(mosq, username, password)){
                fprintf(stderr, "Authentication error\n");
                return 1;
        }

        if(mosquitto_connect(mosq, host, port, keepalive)){
                fprintf(stderr, "Unable to connect.\n");
                return 1;
        }
	

	return 0;
}

int main() {

	char host[] = "localhost";
	int port = 1883;
	bool clean_session = true;
	struct mosquitto *mosq = NULL;

	mosq = mosquitto_new(NULL, clean_session, NULL);
	if (connectMqtt(mosq, host, port, clean_session, "phonax", "Phonax01") >0) return 1;

	// init wiringPi
	wiringPiSetup();

	// Initialize Serial port
	cout << endl;
	cout << "------------------------------------" << endl;
	cout << "  SparkFun APDS-9960 - GestureTest  " << endl;
	cout << "------------------------------------" << endl;

	// Initialize interrupt service routine
	wiringPiISR(APDS9960_INT, INT_EDGE_FALLING,  interruptRoutine);

	// Initialize APDS-9960 (configure I2C and initial values)
	if ( apds.init() ) {
		cout << "APDS-9960 initialization complete" << endl;
	} else {
		cout << "Something went wrong during APDS-9960 init!" << endl;
	}

	// Start running the APDS-9960 gesture sensor engine
	if ( apds.enableGestureSensor(true) ) {
		cout << "Gesture sensor is now running" << endl;
	} else {
		cout << "Something went wrong during gesture sensor init!" << endl;
	}

	while(1) {
		if( isr_flag == 1 ) {
			handleGesture(mosq);
		}
	}


	mosquitto_destroy(mosq);
	mosquitto_lib_cleanup();
	return 0;
}

void interruptRoutine() {
	isr_flag = 1;
}

void handleGesture(struct mosquitto *mosq) {
			isr_flag = 0;
	if ( apds.isGestureAvailable() ) {
		switch ( apds.readGesture() ) {
		case DIR_UP:
			mosquitto_publish(mosq, NULL, "kfmd_pub", 1, "U", 0, false); 
			cout << "UP" << endl;
			break;
		case DIR_DOWN:
			mosquitto_publish(mosq, NULL, "kfmd_pub", 1, "D", 0, false); 
			cout << "DOWN" << endl;
			break;
		case DIR_LEFT:
			mosquitto_publish(mosq, NULL, "kfmd_pub", 1, "L", 0, false); 
			cout << "LEFT" << endl;
			break;
		case DIR_RIGHT:
			mosquitto_publish(mosq, NULL, "kfmd_pub", 1, "R", 0, false); 
			cout << "RIGHT" << endl;
			break;
		case DIR_NEAR:
			cout << "NEAR" << endl;
			break;
		case DIR_FAR:
			cout << "FAR" << endl;
			break;
		default:
			cout << "NONE" << endl;
			break;
		}
	}
}
