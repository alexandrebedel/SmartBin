#include <M5Stack.h>
#include "FS.h"
#include "SPIFFS.h"
#include "uart_frame.h"
#include "core.h"

static QueueHandle_t jpeg_frame_queue = NULL;

void frame_recv_callback(int cmd, const uint8_t *buf, int len)
{
  JpegFrame_t frame;

  frame.buf = (uint8_t *)malloc(sizeof(uint8_t) * len);
  memcpy(frame.buf, buf, len);
  frame.size = len;
  if (xQueueSend(jpeg_frame_queue, &frame, 0) != pdTRUE)
  {
    free(frame.buf);
  }
}

void setup()
{
  M5.begin(true, false, false, false);
  Serial.begin(9200);
  if (!SPIFFS.begin(true))
  {
    Serial.println("Failed to begin splifff my man");
    return;
  }
  uart_frame_init(36, 26, 1500000);
  jpeg_frame_queue = xQueueCreate(2, sizeof(JpegFrame_t));
  pinMode(16, INPUT);
}

bool disablePhoto = false;

void loop()
{
  static bool photo_taken = false;
  static uint32_t photo_timestamp = 0;
  if (!photo_taken)
  {
    if (millis() - photo_timestamp >= 1)
    {
      photo_taken = true;
      Serial.println("Taking photo...");
    }
  }

  if (digitalRead(16) == 1 && photo_taken && !disablePhoto)
  {
    JpegFrame_t frame;

    disablePhoto = true;
    if (xQueueReceive(jpeg_frame_queue, &frame, portMAX_DELAY) == pdTRUE)
    {
      M5.Lcd.drawJpg(frame.buf, frame.size, 0, 0);
      Serial.printf("Received frame - size: %d\n", frame.size);
      // saveJpegToSPIFFS(frame.buf, frame.size, "/image.jpg");
      // listFiles("/");
      free(frame.buf);
      photo_taken = false;
      photo_timestamp = millis();
    }
  }
}