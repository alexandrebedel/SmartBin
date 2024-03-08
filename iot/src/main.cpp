#include <M5Stack.h>
#include "core.h"
#include "camera.h"
#include "filesystem.h"
#include "network.h"
#include "servo.h"
#include "GoPLUS2.h"

unsigned long lastPictureTime = 0;
const unsigned long pictureInterval = 6 * 1000;

void setup()
{
  M5.begin();
  Serial.begin(9600);
  init_network();
  Filesystem::init();
  ServoMotor::init();
  Camera::init();
  lastPictureTime = millis();
}

void loop()
{
  unsigned long currentTime = millis();

  M5.update();
  if (currentTime - lastPictureTime >= pictureInterval)
  {
    Serial.println("Taking a picture");
    Camera::savePicture();
    lastPictureTime = currentTime;
  }
}
