#ifndef LED_H
#define LED_H
#define PIN       26
#define NUMPIXELS 3 

extern Adafruit_NeoPixel pixels;

class Led
{

public:
    static void init();
    static void on();
    static void off();
};

#endif /* LED_H */