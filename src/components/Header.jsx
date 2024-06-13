import logoImg from "../assets/quiz-logo.png";
import React from 'react'

export default function Header(){
  return (
    <header>   
        <img src={logoImg} alt="quiz">
        </img>
        <h1>Quiz App</h1>
    </header>
  )
}
