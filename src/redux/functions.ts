import { deleteQuizeT } from "./slices/list-quiz-slice";
import { newQuizT } from "./slices/new-quiz-slice";
import { compliteDataT } from "./slices/start-quiz-slice";
import { bodyListQuizT } from "./type";


const _ = require('lodash');


export const loadAllQuiz = (key: string): Promise<bodyListQuizT[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const value = localStorage.getItem(key);
                resolve(value ? JSON.parse(value) : []);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
};


interface SaveResult {
    status: boolean;
    message: string;
}


export const saveToLocalStorage = (params: newQuizT): Promise<SaveResult> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (!params.data.quiz_name) {
                    console.log('quiz_name is missing or empty');
                    return {status:false, message:'quiz_name is missing or empty'};
                }
            
                if (!Array.isArray(params.data.quest_list) || params.data.quest_list.length < 1) {
                    console.log('quest_list is missing or has less than 2 items');
                    return {status:false, message:'quest_list is missing or has less than 2 items'};
                }
            
                for (const quest of params.data.quest_list) {
                    if (!quest.quest_name) {
                        console.log(`quest_name is missing or empty for quest_id ${quest.quest_id}`);
                        return {status:false, message:`quest_name is missing or empty for quest_id ${quest.quest_id}`};
                    }
            
                    if (!Array.isArray(quest.quest_answer) || quest.quest_answer.length < 1) {
                        console.log(`quest_answer is missing or has less than 2 items for quest_id ${quest.quest_id}`);
                        return {status:false, message:`quest_answer is missing or has less than 2 items for quest_id ${quest.quest_id}`};
                    }
            
                    for (const answer of quest.quest_answer) {
                        if (!answer.answer_name) {
                            console.log(`answer_name is missing or empty for answer_id ${answer.answer_id} in quest_id ${quest.quest_id}`);
                            return {status:false, message:`answer_name is missing or empty for answer_id ${answer.answer_id} in quest_id ${quest.quest_id}`};
                        }
                    }
                }


                const existingDataString = localStorage.getItem(params.key);
                const existingData: bodyListQuizT[] = existingDataString ? JSON.parse(existingDataString) : [];
                existingData.push(params.data);
                localStorage.setItem(params.key, JSON.stringify(existingData));
                resolve({status:true, message:''});
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


interface startQuizeT{
    quiz_id:string,
    key:string
}

export const startQuizeStorage = (params: startQuizeT):Promise<bodyListQuizT> =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const existingDataString = localStorage.getItem(params.key);
                if (!existingDataString) {
                    throw new Error('No data found in localStorage');
                }
                const thisObj =JSON.parse(existingDataString)

                const existingData = thisObj.find((item:bodyListQuizT) => item.quiz_id === params.quiz_id)

                resolve(existingData);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
}




export const compliteQuizStorage = (params:compliteDataT) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const existingDataString = localStorage.getItem(params.key);
                if (!existingDataString) {
                    throw new Error('No data found in localStorage');
                }
                const thisObj =JSON.parse(existingDataString)

                const indexOfObjectToUpdate = thisObj.findIndex((obj:bodyListQuizT) => obj.quiz_id === params.quiz_id);

                const cloneData = _.cloneDeep(params.quest_list)

                thisObj[indexOfObjectToUpdate].quiz_complited = params.quiz_complited
                thisObj[indexOfObjectToUpdate].quest_list = cloneData

                localStorage.setItem(params.key, JSON.stringify(thisObj));
                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
}