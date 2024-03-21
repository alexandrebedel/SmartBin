#include <M5Stack.h>
#include "servo.h"

GoPlus2 goPlus;
std::map<String, int> SERVO_BOXES = {{"recyclable", SERVO_NUM0}, {"glass", SERVO_NUM1}, {"trash", SERVO_NUM3}};

bool isRecycleOpen = false;
bool isGlassOpen = false;
bool isTrashOpen = false;

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
        M5.update();
        if (M5.BtnA.wasPressed())
        {
            ServoMotor::run(SERVO_BOXES["recyclable"], isRecycleOpen ? CLOSE_ANGLE : OPEN_ANGLE);
            isRecycleOpen = !isRecycleOpen;
        }
        if (M5.BtnB.wasPressed())
        {
            ServoMotor::run(SERVO_BOXES["glass"], isGlassOpen ? CLOSE_ANGLE : OPEN_ANGLE);
            isGlassOpen = !isGlassOpen;
        }
        if (M5.BtnC.wasPressed())
        {
            ServoMotor::run(SERVO_BOXES["trash"], isTrashOpen ? CLOSE_ANGLE : OPEN_ANGLE);
            isTrashOpen = !isTrashOpen;
        }
        vTaskDelay(200);
    }
}

void ServoMotor::open(uint8_t servoNum)
{
    switch (servoNum)
    {
    case 0:
    {
        isRecycleOpen = true;
        break;
    }
    case 1:
    {
        isGlassOpen = true;
        break;
    }
    case 2:
    {
        isTrashOpen = true;
        break;
    }
    }
    ServoMotor::run(servoNum, OPEN_ANGLE);
}

void ServoMotor::close(uint8_t servoNum)
{
    switch (servoNum)
    {
    case 0:
    {
        isRecycleOpen = false;
        // ServoMotor::setIsRecycleOpen(false);
        break;
    }
    case 1:
    {
        isGlassOpen = false;
        // ServoMotor::setIsGlassOpen(false);
        break;
    }
    case 2:
    {
        isTrashOpen = false;
        // ServoMotor::setIsTrashOpen(false);
        break;
    }
    }
    ServoMotor::run(servoNum, CLOSE_ANGLE);
}

bool ServoMotor::isOpen(uint8_t servoNum)
{
    switch (servoNum)
    {
    case 0:
        return isRecycleOpen;
    case 1:
        return isGlassOpen;
    case 2:
        return isTrashOpen;
    }
}