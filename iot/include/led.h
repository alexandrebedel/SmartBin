#ifndef LED_H
#define LED_H
#define PIN 17
#define NUMPIXELS 3

#include <Adafruit_NeoPixel.h>

extern Adafruit_NeoPixel pixels;

class Led
{

public:
    static void init();
    static void on();
    static void off();
};

#endif /* LED_H */