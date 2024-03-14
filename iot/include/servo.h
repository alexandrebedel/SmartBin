#if !defined(SERVO_H)
#define SERVO_H

#include <stdint.h>
#include <map>
#include <GoPLUS2.h>

#define CLOSE_ANGLE 90
#define OPEN_ANGLE 5

/**
 * Maps the Servo numbers to the given
 * trash types
 */
extern std::map<String, int> SERVO_BOXES;

class ServoMotor
{
private:
    // static bool isRecycleOpen;
    // static bool isTrashOpen;
    // static bool isGlassOpen;

    static void run(uint8_t servo_num, uint8_t angle);

public:
    // static void setIsRecycleOpen(bool status) { ServoMotor::isRecycleOpen = status; };
    // static void setIsTrashOpen(bool status) { ServoMotor::isTrashOpen = status; };
    // static void setIsGlassOpen(bool status) { ServoMotor::isGlassOpen = status; };

    // static bool getIsRecycleOpen() { return ServoMotor::isRecycleOpen; };
    // static bool getIsTrashOpen() { return ServoMotor::isTrashOpen; };
    // static bool getIsGlassOpen() { return ServoMotor::isGlassOpen; };

    /**
     * Initializes the Servo module
     */
    static void init();
    static void open(uint8_t servoNum);
    static void close(uint8_t servoNum);
    static void buttonsTask(void *pvParameters);
};

#endif // SERVO_H
