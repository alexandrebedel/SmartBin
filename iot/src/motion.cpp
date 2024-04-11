#include <M5Stack.h>
#include "motion.h"

void Motion::init()
{
    // Needs to be plugged into the PORT C
    // with the grove hub
    pinMode(G16, INPUT);
}

bool Motion::isDetected()
{
    return (digitalRead(G16) == 1);
}