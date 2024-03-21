#if !defined(FILESYSTEM_H)
#define FILESYSTEM_H

#include <stdint.h>
#include <stdlib.h>
#include "camera.h"

class Filesystem
{
public:
    static void init()
    {
        if (!SPIFFS.begin(true))
        {
            Serial.println("Failed to begin splifff my man");
            return;
        }
    }
    /**
     * Writes a file on the microcontroller filesystem
     * and return a success boolean
     */
    static File writeFile(JpegFrame_t frame, const char *filename);
    /**
     * Dumps a directory content
     */
    static void dumpDirectory(const char *dirname);
};

#endif // FILESYSTEM_H
