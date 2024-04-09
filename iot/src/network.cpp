#include <Wifi.h>
#include <M5Stack.h>
#include "network.h"

const char *ssid = "iPhone (8)";
const char *password = "hihihihi";

void Network::init()
{
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    M5.Lcd.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
    }
    M5.Lcd.println("");
    M5.Lcd.println("Connected to WiFi network");
}

IPAddress Network::getIp()
{
    return WiFi.localIP();
}