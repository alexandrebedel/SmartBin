#if !defined(HTTP_H)
#define HTTP_H

#include <WiFiClient.h>
#include "camera.h"

class CustomHTTP
{
public:
    static bool post(JpegFrame_t frame);
    static String getBody();
};

#endif // HTTP_H
