import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Question({
    index,    
    onSelectAnswer, 
    onSkipAnswer }) {

    //state to check if a question is answered or not yet, so as to change bgcolor
    const [answer, setAnswer] = useState({
            selectedAnswer: '',
            isCorrect: null
    });


    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        //this timer is to check if selected answer is right or wrong
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            //use timer so that we dont immediately move to next question after showing correct or wrong,
            //because we need to call setAnswers method to finally track all answers
            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000);
        }, 1000);
    }

    let answerState = "";

    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
    else if(answer.selectedAnswer){
        answerState = "answered";
    }
    return (
        <div id="question">
          
            <QuestionTimer   
                       
                timeout={15000}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
          
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
};