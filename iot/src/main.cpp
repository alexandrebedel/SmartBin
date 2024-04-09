#include <M5Stack.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer *pServer = NULL;

class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    Serial.println("Client connected");
  }

  void onDisconnect(BLEServer *pServer)
  {
    Serial.println("Client disconnected");
  }
};

class MyCallbacks : public BLECharacteristicCallbacks
{
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    std::string value = pCharacteristic->getValue();
    Serial.print("Received data: ");
    Serial.println(value.c_str());
  }
};

void setup()
{
  M5.begin();
  Serial.begin(9600);

  // Set the advertising name
  BLEDevice::init("M5-Stack");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create a service
  BLEService *pService = pServer->createService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");

  // Create a characteristic
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
      "beb5483e-36e1-4688-b7f5-ea07361b26a8",
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE |
          BLECharacteristic::PROPERTY_NOTIFY |
          BLECharacteristic::PROPERTY_INDICATE);

  // Add a descriptor
  pCharacteristic->setCallbacks(new MyCallbacks());
  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();
  // Start advertising
  pServer->getAdvertising()->start();

  Serial.println("BLE server started");
}

void loop()
{
  // Handle BLE events
}