#include <M5Stack.h>
#include "led.h"

Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void Led::init()
{
    pixels.begin();
}

void Led::on()
{
    pixels.setPixelColor(0, pixels.Color(100, 100, 100));
    pixels.setPixelColor(1, pixels.Color(100, 100, 100));
    pixels.setPixelColor(2, pixels.Color(100, 100, 100));
    pixels.show();
}

void Led::off()
{
    pixels.setPixelColor(0, pixels.Color(0, 0, 0));
    pixels.setPixelColor(1, pixels.Color(0, 0, 0));
    pixels.setPixelColor(2, pixels.Color(0, 0, 0));
    pixels.show();
}