#include <Wifi.h>
#include <M5Stack.h>
#include "network.h"

const char *ssid = "iPhone de Damien";
const char *password = "soleilsoleil";

void Network::init()
{
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.println("Waiting to connect");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
    }
    Serial.println("Connected to WiFi network");
}

IPAddress Network::getIp()
{
    return WiFi.localIP();
}