#include <M5Stack.h>
#include "FS.h"
#include "SPIFFS.h"
#include "filesystem.h"
#include "UUID.h"

UUID uuid;
uint32_t start, stop, randomtime;

String generateUID()
{
    uint32_t seed1 = random(999999999);
    uint32_t seed2 = random(999999999);

    start = micros();
    uuid.seed(seed1, seed2);
    stop = micros();
    delay(100);
    start = micros();
    uuid.generate();
    stop = micros();
    delay(100);
    return String(uuid.toCharArray());
}

String Filesystem::getBinId()
{
    String id = "";

    if (SPIFFS.exists("/.smartbin/id"))
    {
        File idFile = SPIFFS.open("/.smartbin/id", "r");

        if (idFile)
        {
            id = idFile.readString();
            idFile.close();
        }
    }
    else
    {
        File idFile = SPIFFS.open("/.smartbin/id", "w");

        if (idFile)
        {
            id = generateUID();
            idFile.print(id);
            idFile.close();
        }
    }
    return id;
}

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