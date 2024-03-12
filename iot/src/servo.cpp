#include <M5Stack.h>
#include "servo.h"

GoPlus2 goPlus;
std::map<String, int> SERVO_BOXES = {{"recyclable", SERVO_NUM0}, {"glass", SERVO_NUM1}, {"trash", SERVO_NUM2}};

void ServoMotor::init()
{
    goPlus.begin();
}

void ServoMotor::run(uint8_t servo_num, uint8_t angle)
{
    goPlus.Servo_write_angle(servo_num, angle);
}

void ServoMotor::buttonsTask(void *pvParameters)
{
    while (true)
    {
        // Keep this on the main loop?
        M5.update();
        if (M5.BtnA.isPressed() || M5.BtnA.wasPressed())
        {
            Serial.println("Opening recycable");
            ServoMotor::open(SERVO_BOXES["recyclable"]);
        }
        if (M5.BtnB.isPressed() || M5.BtnB.wasPressed())
        {
            Serial.println("Opening glass");
            ServoMotor::open(SERVO_BOXES["glass"]);
        }
        if (M5.BtnC.isPressed() || M5.BtnC.wasPressed())
        {
            Serial.println("Opening trash");
            ServoMotor::open(SERVO_BOXES["trash"]);
        }
        // Is this needed ??
        // Introduce a small delay to avoid busy waiting and allow other tasks to run
        vTaskDelay(50);
    }
}

void ServoMotor::open(uint8_t servoNum)
{
    ServoMotor::run(servoNum, OPEN_ANGLE);
}

void ServoMotor::close(uint8_t servoNum)
{
    ServoMotor::run(servoNum, CLOSE_ANGLE);
}