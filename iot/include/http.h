#if !defined(HTTP_H)
#define HTTP_H

#include <WiFiClient.h>
#include "camera.h"
#include "LCBUrl.h"

class CustomHTTP
{
public:
    /**
     * Starts a POST request from a image frame
     *
     * Sends the form-data `image` field
     */
    static bool post(LCBUrl url, JpegFrame_t frame);
    static String getBody();
};

#endif // HTTP_H
