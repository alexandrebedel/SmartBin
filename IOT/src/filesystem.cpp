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
}

bool Filesystem::writeFile(uint8_t *data, size_t size, const char *filename)
{
    File file = SPIFFS.open(filename, FILE_WRITE);

    if (!file)
    {
        Serial.println("Failed to open file for writing");
        return false;
    }
    if (file.write(data, size) != size)
    {
        Serial.println("Failed to write to file");
        return false;
    }
    file.close();
    return true;
}