#include <M5Stack.h>
#include "Servo.h"
#include "GoPLUS2.h"

GoPlus2 goPlus;

void ServoMotor::init()
{
    goPlus.begin();
}

void ServoMotor::run(uint8_t servo_num, uint8_t angle)
{
    goPlus.Servo_write_angle(servo_num, angle);
}

void ServoMotor::open(uint8_t servoNum)
{
    ServoMotor::run(servoNum, OPEN_ANGLE);
}

void ServoMotor::close(uint8_t servoNum)
{
    ServoMotor::run(servoNum, CLOSE_ANGLE);
}