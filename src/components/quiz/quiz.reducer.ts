import { QuizContextStateType, ACTION_TYPE } from "./quiz.types"

export default function quizReducer(state: QuizContextStateType, action: ACTION_TYPE){
    switch (action.type) {
        case "LOAD_DATA":
            return{
                ...state,
                quizData: action.payload.data
            }
        case "INCREASE_QUIZ_SCORE":
            return {
                ...state,
                quizPoints: state.quizPoints + action.payload.point,
                analytics: {...state.analytics, correct: state.analytics.correct + 1}
            }
        case "DECREASE_QUIZ_SCORE": 
            return {
                ...state,
                quizPoints: state.quizPoints - action.payload.negativePoint,
                analytics: {...state.analytics, wrong: state.analytics.wrong + 1}
            }
        case "SKIP_QUESTION":
            return {
                ...state,
                analytics: {...state.analytics, unattempted: state.analytics.unattempted + 1}
            }
        case "RESET_DEFAULTS": 
            return {
                ...state,
                quizPoints: 0,
                analytics : {
                    correct: 0,
                    wrong: 0,
                    unattempted: 0
                },
                userAnswers: []
            }
        case "SET_QUIZ_CATEGORY": 
            return {
                ...state,
                quizCategory: action.payload.category
            }
        default:
            return state;
    }
}