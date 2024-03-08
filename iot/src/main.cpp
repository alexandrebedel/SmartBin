#include <M5Stack.h>
#include "core.h"
#include "camera.h"
#include "filesystem.h"
#include "network.h"
#include "servo.h"
#include "GoPLUS2.h"

unsigned long lastPictureTime = 0;
const unsigned long pictureInterval = 6 * 1000;
bool isopenA = false;
bool isopenB = false;
bool isopenC = false;
bool runOnce = false;

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
    runOnce = true;
  }
}

// if (M5.BtnA.wasPressed())
// {
//   isopenA ? ServoMotor::run(SERVO_NUM0, 90) : ServoMotor::run(SERVO_NUM0, 5);
//   isopenA = !isopenA;
//   Serial.println(isopenA);
// }
// if (M5.BtnB.wasPressed())
// {
//   isopenB ? ServoMotor::run(SERVO_NUM1, 90) : ServoMotor::run(SERVO_NUM1, 5);
//   isopenB = !isopenB;
//   Serial.println(isopenB);
// }
// if (M5.BtnC.wasPressed())
// {
//   isopenC ? ServoMotor::run(SERVO_NUM3, 90) : ServoMotor::run(SERVO_NUM3, 5);
//   isopenC = !isopenC;
//   Serial.println(isopenC);
// }