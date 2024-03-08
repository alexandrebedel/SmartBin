#include <M5Stack.h>
#include "core.h"
#include "camera.h"
#include "filesystem.h"
#include "network.h"
#include "UDHttp.h"

unsigned long lastPictureTime = 0;
const unsigned long pictureInterval = 6 * 1000;
bool runOnce = false;

void setup()
{
  M5.begin();
  Serial.begin(9600);
  init_network();
  Filesystem::init();
  Camera::init();
  lastPictureTime = millis();
}

void loop()
{
  unsigned long currentTime = millis();

  if (currentTime - lastPictureTime >= pictureInterval)
  {
    Serial.println("Taking a picture");
    Camera::savePicture();
    lastPictureTime = currentTime;
    runOnce = true;
  }
}

// void loop()
// {
//   // put your main code here, to run repeatedly:
//   UDHttp udh;
//   // open file on sdcard to read
//   root = SPIFFS.open("test.pdf");
//   if (!root)
//   {
//     Serial.println("can not open file!");
//     return;
//   }
//   // upload downloaded file to local server
//   udh.upload("http://192.168.1.107:80/upload/upload.php", "test.pdf", root.size(), rdataf, progressf, responsef);
//   root.close();
//   Serial.printf("done uploading\n");
// }