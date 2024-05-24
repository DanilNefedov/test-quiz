import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { bodyListQuizT, bodyQuestT,  initStartQuizT } from "../type";
import { compliteQuizStorage, startQuizeStorage } from "../functions";





const _ = require('lodash');


const initialState: initStartQuizT = {
    status: false,
    error: false,
    list_quiz: null

}




export interface newQuizT {
    quiz_id: string,
    key: string
}

export const fetchStartQuiz = createAsyncThunk<bodyListQuizT, newQuizT, { rejectValue: string }>(
    'startQuiz/fetchStartQuiz',
    async function (params, { rejectWithValue, dispatch }) {
        try {
            const response = await startQuizeStorage(params);

            return response;        
        } catch (error) {
            return rejectWithValue("Something's wrong.")
        }
    }
);

export interface compliteDataT {
    quiz_id:string,
    key:string,
    quiz_complited:boolean,
    quest_list:bodyQuestT[]
}



export const fetchComplite = createAsyncThunk<boolean, compliteDataT, { rejectValue: string }>(
    'startQuiz/fetchComplite',
    async function (params, { rejectWithValue, dispatch }) {
        try {
            const response = await compliteQuizStorage(params);

            return params.quiz_complited;        
        } catch (error) {
            return rejectWithValue("Something's wrong.")
        }
    }
);




interface checkAnswerT{
    quest_id:string, 
    answer_id:string, 
    answer_user:boolean
}


const startQuizSlice = createSlice({
    name: 'startQuiz',
    initialState,
    reducers: {
        checkAnswerReducer(state, action: PayloadAction<checkAnswerT>){
            const thisQuest = state.list_quiz?.quest_list.find(el => el.quest_id === action.payload.quest_id)
        
            if(thisQuest){
                const thisAnswer = thisQuest.quest_answer.find(elem => elem.answer_id === action.payload.answer_id)
                
                if(thisAnswer){
                    thisAnswer.answer_user = !action.payload.answer_user
                }
            }        
        
        },

        handlNumbAnswer(state, action: PayloadAction<number>){
            if (state.list_quiz) {
                state.list_quiz.quiz_active_numb = action.payload
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStartQuiz.pending, (state) => {
                state.status = true;
                state.error = false;
            })
            .addCase(fetchStartQuiz.fulfilled, (state, action: PayloadAction<bodyListQuizT>) => {
                state.status = false;
                state.error = false;
                state.list_quiz = action.payload
            })
            .addCase(fetchStartQuiz.rejected, (state) => {
                state.status = false;
                state.error = true;
            })



            .addCase(fetchComplite.pending, (state) => {
                state.status = true;
                state.error = false;
            })
            .addCase(fetchComplite.fulfilled, (state, action: PayloadAction<boolean>) => {
                state.status = false;
                state.error = false;
                if(state.list_quiz){
                    state.list_quiz.quiz_complited = action.payload
                }
                
            })
            .addCase(fetchComplite.rejected, (state) => {
                state.status = false;
                state.error = true;
            })

    }
});

export const {
    checkAnswerReducer,
    handlNumbAnswer
} = startQuizSlice.actions


export default startQuizSlice.reducer;