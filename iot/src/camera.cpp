#include "filesystem.h"
#include "ArduinoJson.h"
#include "servo.h"
#include "GoPLUS2.h"
#include "http.h"

QueueHandle_t Camera::frameQueue = NULL;

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

String Camera::detectTrashType()
{
    String type;
    JpegFrame_t frame;

    if (xQueueReceive(Camera::getFrameQueue(), &frame, portMAX_DELAY) == pdFALSE)
    {
        Serial.println("Failed receiving xQueue");
        return "";
    }
    type = sendPhoto(frame);
    Serial.println("Detected " + type);
    free(frame.buf);
    return type;
}

String Camera::sendPhoto(JpegFrame_t frame)
{
    JsonDocument doc;
    String body;
    LCBUrl url;

    // Improve this code
    url.setUrl("http://172.20.10.2:3000/api/check?binId=alex");
    bool success = CustomHTTP::post(url, frame);

    if (!success)
    {
        Serial.println("Post request failed");
        return "";
    }
    body = CustomHTTP::getBody();

    Serial.println(body);
    deserializeJson(doc, body);

    String type = doc["type"].as<String>();

    if (type == "error")
    {
        Serial.println("Couldn't retrieve the trash type");
        return "";
    }
    Serial.println("Opening type " + type + " which is the number " + SERVO_BOXES[type]);
    ServoMotor::open(SERVO_BOXES[type]);
    Serial.println("Fuck me " + type);
    return type;
}