#include <M5Stack.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID "0693C92E-8A68-41AA-83E2-AA0B17F70168"
#define CHARACTERISTIC_UUID "1F5FF96C-AA4A-4159-BCE4-6C25350CB78B"

BLEServer *pServer = NULL;
BLECharacteristic *pCharacteristic = NULL;
bool deviceConnected = false;

class MyServerCallbacks : public BLEServerCallbacks
{
    void onConnect(BLEServer *pServer)
    {
        Serial.println("Connected");
        deviceConnected = true;
    }

    void onDisconnect(BLEServer *pServer)
    {
        Serial.println("Disconnected");
        deviceConnected = false;
    }
};

class MyCallbacks : public BLECharacteristicCallbacks
{
    void onWrite(BLECharacteristic *pCharacteristic)
    {
        std::string value = pCharacteristic->getValue();

        // Handle received data
        Serial.print("Received data: ");
        Serial.println(value.c_str());
    }
};

void setup()
{
    Serial.begin(9600);

    // Initialize BLE
    BLEDevice::init("M5-Stack");
    pServer = BLEDevice::createServer();
    pServer->setCallbacks(new MyServerCallbacks());

    // Create service and characteristic
    BLEService *pService = pServer->createService(SERVICE_UUID);
    pCharacteristic = pService->createCharacteristic(
        CHARACTERISTIC_UUID,
        BLECharacteristic::PROPERTY_READ |
            BLECharacteristic::PROPERTY_WRITE |
            BLECharacteristic::PROPERTY_NOTIFY |
            BLECharacteristic::PROPERTY_INDICATE);
    pCharacteristic->setCallbacks(new MyCallbacks());
    pCharacteristic->addDescriptor(new BLE2902());

    // Start the service
    pService->start();

    // Start advertising
    BLEAdvertising *pAdvertising = pServer->getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->start();

    Serial.println("BLE server started");
}

void loop()
{
    // Check if device is connected
    if (deviceConnected)
    {
        M5.Lcd.println("Device connected");
        // Do something when device is connected
    }

    delay(1000);
}