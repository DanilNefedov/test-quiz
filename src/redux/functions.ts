import { deleteQuizeT } from "./slices/list-quiz-slice";
import { newQuizT } from "./slices/new-quiz-slice";
import { bodyListQuizT } from "./type";





export const loadAllQuiz = (key: string): Promise<bodyListQuizT[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const value = localStorage.getItem(key);
                resolve(value ? JSON.parse(value) : []);
                // console.log(JSON.parse(value))
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
};




export const saveToLocalStorage = (params: newQuizT) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const existingDataString = localStorage.getItem(params.key);
                const existingData: bodyListQuizT[] = existingDataString ? JSON.parse(existingDataString) : [];
                existingData.push(params.data);
                localStorage.setItem(params.key, JSON.stringify(existingData));
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
};




export const deleteQuizeStorage = (params: deleteQuizeT) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const existingDataString = localStorage.getItem(params.key);
                if (!existingDataString) {
                    throw new Error('No data found in localStorage');
                }

                const existingData: bodyListQuizT[] = JSON.parse(existingDataString);

                const updatedData = existingData.filter(item => item.quiz_id !== params.quiz_id);

                localStorage.setItem(params.key, JSON.stringify(updatedData));

                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
};