#if !defined(CAMERA_H)
#define CAMERA_H

#include <stdint.h>
#include <stdlib.h>
#include "core.h"
#include <string.h>
#include "uart_frame.h"
#include <M5Stack.h>

const int CAMERA_PIN = 16;

class Camera
{
private:
    static QueueHandle_t frameQueue;

public:
    static void init()
    {
        uart_frame_init(36, 26, 1500000);
        Camera::frameQueue = xQueueCreate(2, sizeof(JpegFrame_t));
        pinMode(CAMERA_PIN, INPUT);
    };

    /**
     * Gets the frameQueue set on the init function
     */
    static QueueHandle_t getFrameQueue() { return Camera::frameQueue; };
    static void frameRecv(int cmd, const uint8_t *buf, int len);
    /**
     * Saves the picture on the filesystem from the received
     * jpeg frame
     */
    static void getImageBuffer();
    static void sendPhoto(JpegFrame_t frame);
};

#endif // CAMERA_H
