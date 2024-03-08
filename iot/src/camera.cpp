#include "camera.h"
#include "filesystem.h"
#include "WiFiClient.h"
#include "ArduinoJson.h"
#include "servo.h"
#include "GoPLUS2.h"

WiFiClient client;

QueueHandle_t Camera::frameQueue = NULL;
String serverName = "192.168.43.105";
String serverPath = "/api/check";
const int serverPort = 3000;

void sendPhoto(JpegFrame_t frame);

// Rewriting the weak ref of the uart lib
void frame_recv_callback(int cmd, const uint8_t *buf, int len)
{
    return Camera::frameRecv(cmd, buf, len);
}

void Camera::frameRecv(int cmd, const uint8_t *buf, int len)
{
    JpegFrame_t frame;

    frame.buf = (uint8_t *)malloc(sizeof(uint8_t) * len);
    memcpy(frame.buf, buf, len);
    frame.size = len;
    if (xQueueSend(Camera::getFrameQueue(), &frame, 0) != pdTRUE)
    {
        free(frame.buf);
    }
}

void Camera::savePicture()
{
    char filename[50];
    JpegFrame_t frame;

    if (xQueueReceive(Camera::getFrameQueue(), &frame, portMAX_DELAY) == pdFALSE)
    {
        Serial.println("Failed receiving xQueue");
        return;
    }
    sendPhoto(frame);
    free(frame.buf);
}

void sendPhoto(JpegFrame_t frame)
{
    String getBody;
    Serial.println("Connecting to server: " + serverName);

    if (!client.connect(serverName.c_str(), serverPort))
    {
        Serial.println("Connection to " + serverName + " failed");
        return;
    }
    Serial.println("Connection successful!");
    String head = "--RandomNerdTutorials\r\nContent-Disposition: form-data; name=\"image\"; filename=\"photo.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--RandomNerdTutorials--\r\n";

    uint32_t imageLen = frame.size;
    uint32_t extraLen = head.length() + tail.length();
    uint32_t totalLen = imageLen + extraLen;

    client.println("POST " + serverPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=RandomNerdTutorials");
    client.println();
    client.print(head);

    uint8_t *fbBuf = frame.buf;
    size_t fbLen = frame.size;
    for (size_t n = 0; n < fbLen; n = n + 1024)
    {
        if (n + 1024 < fbLen)
        {
            client.write(fbBuf, 1024);
            fbBuf += 1024;
        }
        else if (fbLen % 1024 > 0)
        {
            size_t remainder = fbLen % 1024;
            client.write(fbBuf, remainder);
        }
    }
    client.print(tail);

    int timoutTimer = 10000;
    long startTimer = millis();
    bool captureJson = false;

    while ((startTimer + timoutTimer) > millis())
    {
        Serial.print(".");
        delay(100);
        while (client.available())
        {
            char c = client.read();
            // Serial.printf("%c", c);
            if (c == '{')
            {
                captureJson = true;
            }
            if (c == '}')
            {
                getBody += String(c);
                captureJson = false;
            }
            if (captureJson)
            {
                getBody += String(c);
            }
            startTimer = millis();
        }
    }
    client.stop();

    JsonDocument doc;

    deserializeJson(doc, getBody);
    Serial.println("Got type " + doc["type"].as<String>());

    if (doc["type"].as<String>() == "recyclable")
    {

        ServoMotor::open(SERVO_NUM0);
    }
}