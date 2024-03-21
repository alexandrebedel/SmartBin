#include <M5Stack.h>
#include "motion.h"

void Motion::init()
{
    pinMode(G16, INPUT);
}

bool Motion::isDetected()
{
    return (digitalRead(G16) == 1);
}