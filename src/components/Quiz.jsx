import { useState, useCallback } from 'react'
import QUESTIONS from "../questions.js";
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
   
    const [userAnswers, setUserAnswers] = useState([]);

    //active question is the next just after number of questions answered.    
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

    }, []);

    //use useCallback because we dont want to re-create function handleSelectAnswer for skipped answer
    const handleSkipAnswer = useCallback(() => { 
        handleSelectAnswer(null)
    }, [handleSelectAnswer]);

    if(quizIsComplete){
        return <Summary userAnswers={userAnswers} />       
    }    

    return (
        <div id="quiz">

              {/* key atrribute forces react to destroy old component and re-create it so that 
        we get answers for current question, instead of prev answers of prev question referenced by useRef
        */}
           <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex} 
                onSelectAnswer={handleSelectAnswer}               
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    );
}
