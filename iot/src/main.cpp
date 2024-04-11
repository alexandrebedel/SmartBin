#include <M5Stack.h>
#include "core.h"
#include "camera.h"
#include "filesystem.h"
#include "network.h"
#include "servo.h"
#include "motion.h"
#include "led.h"

bool closeTimeout = false;
String binId = "";
unsigned long lastPictureTime = millis();
unsigned long currentTime = millis();
auto expoAddr = [](String binId, IPAddress ip = IPAddress(172, 20, 10, 2)) -> String
{
  return String("exp://") + ip.toString() + ":8081/--/" + binId;
};

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
  Serial.println("Setip");
}

void loop()
{
  String type = "";

  // if (binId.isEmpty())
  // {
  //   binId = Filesystem::getBinId();
  //   M5.Lcd.qrcode(expoAddr(binId));
  // }
  if (Motion::isDetected())
  {
    Serial.println("Detected something");
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
