#include <M5Stack.h>
#include "FS.h"
#include "SPIFFS.h"
#include "filesystem.h"

void Filesystem::dumpDirectory(const char *dirname)
{
    Serial.printf("Listing directory: %s\n", dirname);
    File root = SPIFFS.open(dirname);

    if (!root)
    {
        Serial.println("Failed to open directory");
        return;
    }
    if (!root.isDirectory())
    {
        Serial.println("Not a directory");
        return;
    }

    File file = root.openNextFile();
    while (file)
    {
        if (file.isDirectory())
        {
            Serial.print("  DIR : ");
            Serial.println(file.name());
        }
        else
        {
            Serial.print("  FILE: ");
            Serial.print(file.name());
            Serial.print("\tSIZE: ");
            Serial.println(file.size());
        }
        file = root.openNextFile();
    }
    file.close();
    root.close();
}

File Filesystem::writeFile(JpegFrame_t frame, const char *filename)
{
    File file = SPIFFS.open(filename, FILE_WRITE);

    if (!file)
    {
        Serial.println("Failed to open file for writing");
        return (fs::File)NULL;
    }
    if (file.write(frame.buf, frame.size) != frame.size)
    {
        Serial.println("Failed to write to file");
        return (fs::File)NULL;
    }
    return file;
}