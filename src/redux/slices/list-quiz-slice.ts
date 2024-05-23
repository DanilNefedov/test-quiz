import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { bodyListQuizT, initListQuizT } from "../type";
import { deleteQuizeStorage, loadAllQuiz, saveToLocalStorage } from "../functions";
const _ = require('lodash');


const initialState: initListQuizT = {
    status: false,
    error: false,
    list_quiz: []

}



export const fetchAllQuiz = createAsyncThunk<bodyListQuizT[], string, { rejectValue: string }>(
    'listQuiz/fetchAllQuiz',
    async function (data, { rejectWithValue }) {
        try {
            const quiz = await loadAllQuiz(data);
            console.log(quiz)
            return quiz;
        } catch (error) {
            return rejectWithValue("Something's wrong.")
        }
    }
);


export interface deleteQuizeT {
    key:string,
    quiz_id:string
}

export const deleteQuizFetch = createAsyncThunk<deleteQuizeT, deleteQuizeT, { rejectValue: string }>(
    'listQuiz/deleteQuizFetch',
    async function (params, { rejectWithValue }) {
        try {
            await deleteQuizeStorage(params);
            return params;
        } catch (error) {
            return rejectWithValue("Something's wrong.")
        }
    }
);




const listQuizSlice = createSlice({
    name: 'listQuiz',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuiz.pending, (state) => {
                state.status = true;
                state.error = false;
            })
            .addCase(fetchAllQuiz.fulfilled, (state, action: PayloadAction<bodyListQuizT[]>) => {
                state.status = false;
                state.error = false;
                action.payload.map(el => {
                    const thisQuiz = state.list_quiz.find(elem => elem.quiz_id === el.quiz_id)

                    if (!thisQuiz) {
                        const cloneData = _.cloneDeep(el)
                        console.log(cloneData, el)
                        state.list_quiz.push(cloneData)
                    }

                })
            })
            .addCase(fetchAllQuiz.rejected, (state) => {
                state.status = false;
                state.error = true;
            })



            .addCase(deleteQuizFetch.pending, (state) => {
                state.status = true;
                state.error = false;
            })
            .addCase(deleteQuizFetch.fulfilled, (state, action: PayloadAction<deleteQuizeT>) => {
                const { quiz_id} = action.payload
                state.status = false;
                state.error = false;
                console.log(action.payload)
                state.list_quiz = state.list_quiz.filter((quiz) => quiz.quiz_id !== quiz_id);

            })
            .addCase(deleteQuizFetch.rejected, (state) => {
                state.status = false;
                state.error = true;
            })





    }
});

export default listQuizSlice.reducer;