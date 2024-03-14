#include <M5Stack.h>
#include "motion.h"

void Motion::init()
{
    pinMode(36, INPUT);
}

bool Motion::isDetected()
{
    return (digitalRead(36) == 1);
}