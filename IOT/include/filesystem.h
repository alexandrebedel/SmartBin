#if !defined(FILESYSTEM_H)
#define FILESYSTEM_H

#include <stdint.h>
#include <stdlib.h>

class Filesystem
{
public:
    /**
     * Writes a file on the microcontroller filesystem
     * and return a success boolean
     */
    static bool writeFile(uint8_t *data, size_t size, const char *filename);
    /**
     * Dumps a directory content
     */
    static void dumpDirectory(const char *dirname);
};

#endif // FILESYSTEM_H
