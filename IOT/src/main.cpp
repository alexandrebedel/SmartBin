#include <M5Stack.h>
#include "FS.h"
#include "SPIFFS.h"
#include "uart_frame.h"

typedef struct _JpegFrame_t {
  uint8_t *buf;
  uint32_t size;
} JpegFrame_t;

static QueueHandle_t jpeg_frame_queue = NULL;

void frame_recv_callback(int cmd, const uint8_t* buf, int len) {
  JpegFrame_t frame;
  frame.buf = (uint8_t *)malloc(sizeof(uint8_t) * len);
  memcpy(frame.buf, buf, len);
  frame.size = len;
  if (xQueueSend(jpeg_frame_queue, &frame, 0) != pdTRUE) {
    free(frame.buf);
  }
}

void listFiles(const char *dirname) {
  Serial.printf("Listing directory: %s\n", dirname);
  File root = SPIFFS.open(dirname);
  if (!root) {
    Serial.println("Failed to open directory");
    return;
  }
  if (!root.isDirectory()) {
    Serial.println("Not a directory");
    return;
  }
  File file = root.openNextFile();
  while (file) {
    if (file.isDirectory()) {
      Serial.print("  DIR : ");
      Serial.println(file.name());
    } else {
      Serial.print("  FILE: ");
      Serial.print(file.name());
      Serial.print("\tSIZE: ");
      Serial.println(file.size());
    }
    file = root.openNextFile();
  }
}

void saveJpegToSPIFFS(uint8_t *data, size_t size, const char *filename) {
  Serial.printf("filename: %s\n", filename);
  File file = SPIFFS.open(filename, FILE_WRITE);
  if (!file) {
    Serial.println("Failed to open file for writing");
    return;
  }
  if (file.write(data, size) != size) {
    Serial.println("Failed to write to file");
  }
  file.close();
  Serial.println("Image saved to SPIFFS");
}

void setup(){
  M5.begin(true, false, false, false);
  Serial.begin(9200);
  if (!SPIFFS.begin(true)) {
    Serial.println("Failed to begin splifff my man");
    return;
  }
  uart_frame_init(36, 26, 1500000);
  jpeg_frame_queue = xQueueCreate(2, sizeof(JpegFrame_t));
  pinMode(16, INPUT);
}

bool disablePhoto = false;

void loop() {
  static bool photo_taken = false;
  static uint32_t photo_timestamp = 0;
  if (!photo_taken) {
    if (millis() - photo_timestamp >= 1) {
      photo_taken = true;
      Serial.println("Taking photo...");
    }
  }

  if ( digitalRead(16) == 1 && photo_taken && !disablePhoto) {
    disablePhoto = true;
    JpegFrame_t frame;
    if (xQueueReceive(jpeg_frame_queue, &frame, portMAX_DELAY) == pdTRUE) {
      M5.Lcd.drawJpg(frame.buf, frame.size, 0, 0);
      Serial.printf("Received frame - size: %d\n", frame.size);
      saveJpegToSPIFFS(frame.buf, frame.size, "/image.jpg");
      listFiles("/");
      free(frame.buf);
      photo_taken = false;
      photo_timestamp = millis();
    }
  }
}