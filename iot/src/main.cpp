#include <M5Stack.h>
#include "core.h"
#include "camera.h"
#include "filesystem.h"
#include "network.h"
#include "servo.h"
#include "motion.h"
#include "led.h"

bool closeTimeout = false;
unsigned long lastPictureTime = millis();
unsigned long currentTime = millis();
String binId = "";

void setup()
{
  M5.begin();
  Serial.begin(9600);
  Network::init();
  Filesystem::init();
  ServoMotor::init();
  Camera::init();
  Motion::init();
  Led::init();
  lastPictureTime = millis();
  xTaskCreatePinnedToCore(ServoMotor::buttonsTask, "buttonsTask", 4096, NULL, 1, NULL, 0);
}

void loop()
{
  String type = "";

  if (binId.isEmpty())
  {
    binId = Filesystem::getBinId();
    M5.Lcd.qrcode(binId);
  }
  if (Motion::isDetected())
  {
    Led::on();
    Serial.println("Taking a picture");
    type = Camera::detectTrashType();
    lastPictureTime = millis();
    closeTimeout = true;
  }
  currentTime = millis();
  if (currentTime - lastPictureTime >= 10 * 1000 && closeTimeout)
  {
    Serial.println("Closing the servo motor after 10 seconds");
    Led::off();
    ServoMotor::close(SERVO_BOXES[type]);
    closeTimeout = false;
  }
}
