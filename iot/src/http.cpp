#include <M5Stack.h>
#include "http.h"

WiFiClient client;
/**
 * TODO: move this to an env file or something like this
 */
String serverName = "192.168.43.105";
String serverPath = "/api/check?binId=alex";

String head = "--SmartBin\r\nContent-Disposition: form-data; name=\"image\"; filename=\"photo.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
String tail = "\r\n--SmartBin--\r\n";
uint32_t extraLen = head.length() + tail.length();

const int serverPort = 3000;

bool CustomHTTP::post(JpegFrame_t frame)
{
    uint8_t *fbBuf = frame.buf;
    size_t fbLen = frame.size;

    if (!client.connect(serverName.c_str(), serverPort))
    {
        Serial.println("Connection to " + serverName + " failed");
        return false;
    }
    client.println("POST " + serverPath + " HTTP/1.1");
    client.println("Host: " + serverName);
    client.println("Content-Length: " + String(frame.size + extraLen));
    client.println("Content-Type: multipart/form-data; boundary=SmartBin");
    client.println();
    client.print(head);

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
    return true;
}

String CustomHTTP::getBody()
{
    int timoutTimer = 10000;
    long startTimer = millis();
    bool captureJson = false;
    String body;

    while ((startTimer + timoutTimer) > millis())
    {
        Serial.print(".");
        delay(100);
        while (client.available())
        {
            char c = client.read();

            if (c == '{')
            {
                captureJson = true;
            }
            if (c == '}')
            {
                body += String(c);
                captureJson = false;
            }
            if (captureJson)
            {
                body += String(c);
            }
            startTimer = millis();
        }
    }
    client.stop();
    return body;
}