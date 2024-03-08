#if !defined(SERVO_H)
#define SERVO_H

#define OPEN_ANGLE 90
#define CLOSE_ANGLE 5

enum BOXES
{

};

#include <stdint.h>

class ServoMotor
{
private:
    static void run(uint8_t servo_num, uint8_t angle);

public:
    static void init();
    static void open(uint8_t servoNum);
    static void close(uint8_t servoNum);
};

#endif // SERVO_H
