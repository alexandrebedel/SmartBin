#ifndef MOTION_H
#define MOTION_H

class Motion
{

public:
    static void init();
    /**
     * This function will return true for 2s
     * if an object is detected
    */
    static bool isDetected();
};

#endif /* MOTION_H */