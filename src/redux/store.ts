import { configureStore } from "@reduxjs/toolkit"
import listQuizSlice from "./slices/list-quiz-slice"
import newQuizSlice from "./slices/new-quiz-slice"
import startQuizSlice from "./slices/start-quiz-slice"

export const store = configureStore({
    reducer:{
        listQuiz:listQuizSlice,
        newQuiz:newQuizSlice,
        startQuiz:startQuizSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch