import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, onTimeout}){

    const [remainingTime, setRemainingTime] = useState(timeout);

    /* use useEffect hook becase we dont want to initialize a new timer 
    everytime for 100ms interval when updating progress bar remaining time state 
    and hence re-rendering component */
    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout();
        }, timeout);

        //cleanup function
        return () => {
            clearTimeout(timer);
        };
    }, [timeout, onTimeout]); 

    //update state based on everytime interval 100ms is done so as to update progress bar.
    //use useEffect because we dont want to go in infinite loop of creating new interval everytime
    //while updating state and hence re-rendering component. No dependencies because we dont want
    //to re-run for any dependencies but just after that 100ms interval
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        },100);

        //cleanup function is executed just before this effect is executed again for next 100ms
        return () => {
            clearInterval(interval);
        };
    }, []);
  
    return <progress id="question-time" max={timeout} value={remainingTime} />
}