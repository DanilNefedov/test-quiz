import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { bodyListQuizT, initNewQuizT } from "../type";
import { saveToLocalStorage, } from "../functions";
import { v4 as uuidv4 } from 'uuid';





const _ = require('lodash');


const initialState: initNewQuizT = {
    status: false,
    error: false,
    list_quiz: {
        quiz_id: uuidv4(),
        quiz_name: '',
        quiz_full_numb: 1,
        quiz_active_numb: 0,
        quiz_complited: false,
        quest_list: [
            {
                quest_complited: false,
                quest_id: uuidv4(),
                quest_name: '',
                quest_answer: [
                    {
                        answer_id: uuidv4(),
                        answer_name: '',
                        answer_score: 0,
                        answer_user:false,
                    },
                ]
            }
        ]
    }

}





export interface newQuizT {
    data: bodyListQuizT,
    key: string
}

export const addNewQuiz = createAsyncThunk<bodyListQuizT, newQuizT, { rejectValue: string }>(
    'newQuiz/addNewQuiz',
    async function (params, { rejectWithValue, dispatch }) {
        try {
            const response = await saveToLocalStorage(params);

            if(!response.status){
                return rejectWithValue(response.message)
            }
            dispatch(resetState())
            return params.data;
        } catch (error) {
            return rejectWithValue("Something's wrong.")
        }
    }
);


interface newAnswerT {
    quest_id: string,
    answer_id: string,
    answer_name: string
}

interface newScoreT {
    quest_id: string,
    answer_id: string,
    answer_score: number
}

const newQuizSlice = createSlice({
    name: 'newQuiz',
    initialState,
    reducers: {

        resetState: () => initialState,

        newQuestion(state,) {
            const newQuestion = {
                quest_complited: false,
                quest_id: uuidv4(),
                quest_name: '',
                quest_answer: [
                    {
                        answer_id: uuidv4(),
                        answer_name: '',
                        answer_score: 0,
                        answer_user:false
                    },
                ]
            }
            state.list_quiz.quiz_full_numb += 1
            state.list_quiz.quest_list.push(newQuestion)
        },
        newAnswer(state, action: PayloadAction<string>) {
            const newAnswer = {
                answer_id: uuidv4(),
                answer_name: '',
                answer_score: 0,
                answer_user:false

            }

            const thisQuest = state.list_quiz.quest_list.find(el => el.quest_id === action.payload)

            if (thisQuest) {
                thisQuest.quest_answer.push(newAnswer)
            }
        },

        newName(state, action: PayloadAction<string>) {
            state.list_quiz.quiz_name = action.payload
        },

        newNameQuestion(state, action: PayloadAction<{ quest_id: string, quest_name: string }>) {
            const thisQuest = state.list_quiz.quest_list.find(el => el.quest_id === action.payload.quest_id)

            if (thisQuest) {
                thisQuest.quest_name = action.payload.quest_name
            }
        },

        newNameAnswer(state, action: PayloadAction<newAnswerT>) {
            const thisQuest = state.list_quiz.quest_list.find(el => el.quest_id === action.payload.quest_id)
            if (thisQuest) {

                const thisAnswer = thisQuest.quest_answer.find(elem => elem.answer_id === action.payload.answer_id)

                if (thisAnswer) {
                    thisAnswer.answer_name = action.payload.answer_name
                }

            }
        },

        newScore(state, action: PayloadAction<newScoreT>) {
            const thisQuest = state.list_quiz.quest_list.find(el => el.quest_id === action.payload.quest_id)
            if (thisQuest) {

                const thisAnswer = thisQuest.quest_answer.find(elem => elem.answer_id === action.payload.answer_id)

                if (thisAnswer) {
                    thisAnswer.answer_score = action.payload.answer_score
                }

            }
        },

        deleteQuestionReducer(state, action: PayloadAction<string>) {
            state.list_quiz.quest_list = state.list_quiz.quest_list.filter(
                quest => quest.quest_id !== action.payload
            );
            state.list_quiz.quiz_full_numb -= 1
        },

        deleteAnswerReducer(state, action: PayloadAction<{ quest_id: string, answer_id: string }>) {
            const { quest_id, answer_id } = action.payload;
            const quest = state.list_quiz.quest_list.find(q => q.quest_id === quest_id);
            if (quest) {
                quest.quest_answer = quest.quest_answer.filter(answer => answer.answer_id !== answer_id);
            }
        },

    },
    
});

export const {
    newQuestion,
    newAnswer,
    newName,
    newNameQuestion,
    newNameAnswer,
    newScore,
    deleteQuestionReducer,
    deleteAnswerReducer,
    resetState
} = newQuizSlice.actions


export default newQuizSlice.reducer;