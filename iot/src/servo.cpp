#include <M5Stack.h>
#include "servo.h"

GoPlus2 goPlus;
std::map<String, int> SERVO_BOXES = {{"glass", SERVO_NUM0}, {"organic", SERVO_NUM1}, {"recyclable", SERVO_NUM3}};

bool isGlassOpen = false;
bool isOrganicOpen = false;
bool isRecyclableOpen = false;

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
            ServoMotor::run(SERVO_BOXES["glass"], isGlassOpen ? CLOSE_ANGLE : OPEN_ANGLE);
            isGlassOpen = !isGlassOpen;
        }
        if (M5.BtnB.wasPressed())
        {
            ServoMotor::run(SERVO_BOXES["organic"], isOrganicOpen ? CLOSE_ANGLE : OPEN_ANGLE);
            isOrganicOpen = !isOrganicOpen;
        }
        if (M5.BtnC.wasPressed())
        {
            ServoMotor::run(SERVO_BOXES["recyclable"], isRecyclableOpen ? CLOSE_ANGLE : OPEN_ANGLE);
            isRecyclableOpen = !isRecyclableOpen;
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
        isGlassOpen = true;
        break;
    }
    case 1:
    {
        isOrganicOpen = true;
        break;
    }
    case 3:
    {
        isRecyclableOpen = true;
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
        isGlassOpen = false;
        // ServoMotor::setIsRecycleOpen(false);
        break;
    }
    case 1:
    {
        isOrganicOpen = false;
        // ServoMotor::setIsGlassOpen(false);
        break;
    }
    case 3:
    {
        isRecyclableOpen = false;
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
        return isOrganicOpen;
    case 1:
        return isGlassOpen;
    case 3:
        return isRecyclableOpen;
    }
}