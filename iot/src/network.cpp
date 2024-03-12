#include <Wifi.h>
#include <M5Stack.h>

const char *ssid = "HUAWEI P20 Pro";
const char *password = "soleilsoleil";

void init_network()
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
