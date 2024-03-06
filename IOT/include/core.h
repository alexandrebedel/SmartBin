#if !defined(CORE_H)
#define CORE_H

#include <stdint.h>

typedef struct _JpegFrame_t
{
    uint8_t *buf;
    uint32_t size;
} JpegFrame_t;

#endif // CORE_H
