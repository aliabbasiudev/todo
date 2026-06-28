import { useState, useRef, useCallback, useEffect } from 'react';

export const useTimer = (duration, onComplete) => {
    const [timerLeft, setTimerLeft] = useState(duration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const timer = useCallback(() => {
        clearInterval(intervalRef.current)
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimerLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current)
                    setIsRunning(false)
                    if(onComplete) onComplete()
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }, [onComplete])
    
    const reset = useCallback(() => {
        clearInterval(intervalRef.current)
        setIsRunning(false)
        setTimerLeft(duration * 60)
    }, [duration])
    
    const pause = useCallback(() => {
        clearInterval(intervalRef.current)
    }, [])
    useEffect(() => {
        setTimerLeft(duration * 60)
    }, [duration])
 
    return { timerLeft, pause, timer, reset }
}
