
export type QuizContextStateType = {
  quizData: QuizQuestion[];
  quizPoints: number;
  userAnswers: string | null [],
  analytics: Analytics
};

export type Analytics = {
  correct: number,
  wrong: number,
  unattempted: number
}

export type QuizQuestion = {
  _id: number;
  question: string;
  options: {
    [key: string] : string,
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
  };
  correct_answer: string;
  point: number,
  negativePoint: number,
  category: string,
  difficulty: string;
};

export type ACTION_TYPE = 
| { type: "LOAD_DATA", payload: { data: QuizQuestion[] }}
| { type: "INCREASE_QUIZ_SCORE", payload: { point: number } }
| { type: "DECREASE_QUIZ_SCORE", payload: { negativePoint: number } }
| { type: "SKIP_QUESTION" }
| { type: "RESET_DEFAULTS" }
| { type: "RECORD_USER_ANSWERS", payload: { userAnswer: string | null } }