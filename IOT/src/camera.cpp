#include "camera.h"
#include "filesystem.h"
#include "UDHttp.h"

WiFiClient client;

QueueHandle_t Camera::frameQueue = NULL;
String serverName = "192.168.43.105";
String serverPath = "/api/check";
const int serverPort = 5000;

void sendPhoto(JpegFrame_t frame);

// int responsef(uint8_t *buffer, int len)
// {
//     Serial.printf("buffer: %s\n", buffer);
//     return 0;
// }

// int rdataf(uint8_t *buffer, int len)
// {
//     // read file to upload
//     if (root.available())
//     {
//         Serial.println("Root available");
//         return root.read(buffer, len);
//     }
//     return 0;
// }

// int wdataf(uint8_t *buffer, int len)
// {
//     // write downloaded data to file
//     return root.write(buffer, len);
// }

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
    sprintf(filename, "/image-%02d.jpg", millis());
    // if (!(root = Filesystem::writeFile(frame, filename)))
    // {
    //     Serial.println("Write file failed");
    //     free(frame.buf);
    //     return;
    // }

    sendPhoto(frame);

    // root.close();
    // Filesystem::dumpDirectory("/");
    // M5.Lcd.drawJpg(frame.buf, frame.size, 0, 0);
    // if (!SPIFFS.remove(filename))
    // {
    //     Serial.println("Failed to remove the file");
    // }
    free(frame.buf);
}

void sendPhoto(JpegFrame_t frame)
{
    String getAll;
    String getBody;
    Serial.println("Connecting to server: " + serverName);

    if (client.connect(serverName.c_str(), serverPort))
    {
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

        // esp_camera_fb_return(fb);

        int timoutTimer = 10000;
        long startTimer = millis();
        boolean state = false;

        while ((startTimer + timoutTimer) > millis())
        {
            Serial.print(".");
            delay(100);
            while (client.available())
            {
                char c = client.read();
                if (c == '\n')
                {
                    if (getAll.length() == 0)
                    {
                        state = true;
                    }
                    getAll = "";
                }
                else if (c != '\r')
                {
                    getAll += String(c);
                }
                if (state == true)
                {
                    getBody += String(c);
                }
                startTimer = millis();
            }
            if (getBody.length() > 0)
            {
                break;
            }
        }
        Serial.println();
        client.stop();
        Serial.println(getBody);
    }
    else
    {
        getBody = "Connection to " + serverName + " failed.";
        Serial.println(getBody);
    }
}