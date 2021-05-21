import React, { createContext, useContext, PropsWithChildren, useEffect, useReducer } from "react";

import { QuizContextStateType } from "./quiz.types"
import quizReducer from "./quiz.reducer"

import axios from 'axios'
import QuizQuestions from "./QuizQuestions";

const initialState:QuizContextStateType = {
  quizData: [],
  quizPoints: 0,
  userAnswers: [],
  analytics: {
    correct: 0,
    wrong: 0,
    unattempted: 0
  }
}

const QuizContext =
  createContext<{
    quizState: QuizContextStateType;
    quizDispatch: React.Dispatch<any>;
  }>({
    quizState: initialState,
    quizDispatch: () => null
  });

export function QuizProvider({ children }: PropsWithChildren<{}>) {

  const [state, dispatch] = useReducer(quizReducer, initialState)

  useEffect(() => {
    getQuizData();
  }, []);

  async function getQuizData() {
    try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/question`
      );
      console.log(data)
      if(status === 200){
        dispatch({ type: "LOAD_DATA", payload: { data : data.questions } })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <QuizContext.Provider value={{ quizState: state, quizDispatch: dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(){
    return useContext(QuizContext);
}