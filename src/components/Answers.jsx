import { useRef } from "react";
export default function Answers({ answers, selectedAnswer, answerState, onSelect }){
    
    //to store ref of shuffled answers so they dont shuffle again when Answers is re-executed for bgcolor
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        //copy questions into another array so that we can shuffle answers
        shuffledAnswers.current = [...answers];
        //random() will return between 0 and 1 (excuding 1),
        //so subtracting 0.5 will give positive value 50% times and 
        //negative number for rest of 50%. Hence array is shuffled, because
        //negative number in sort will change the order in array.
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
        {shuffledAnswers.current.map(answer => {

            const isSelected = selectedAnswer === answer;
            let cssClass = "";

            if(answerState === 'answered' && isSelected){
                cssClass = 'selected';
            }

            if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                cssClass = answerState;
            }
             return (
                <li key={answer} className="answer">
                <button onClick={() => onSelect(answer)}
                       className={cssClass}
                       disabled={answerState !== ''}
                >
                   {answer}
                </button>
                </li>
             ); 
        }
         
        )}
    </ul>
    );
};