#if !defined(SERVO_H)
#define SERVO_H

#include <stdint.h>
#include <map>
#include <GoPLUS2.h>

#define OPEN_ANGLE 90
#define CLOSE_ANGLE 5

/**
 * Maps the Servo numbers to the given
 * trash types
 */
extern std::map<String, int> SERVO_BOXES;

class ServoMotor
{
private:
    static void run(uint8_t servo_num, uint8_t angle);

public:
    /**
     * Initializes the Servo module
     */
    static void init();
    static void open(uint8_t servoNum);
    static void close(uint8_t servoNum);
    static void buttonsTask(void *pvParameters);
};

#endif // SERVO_H
