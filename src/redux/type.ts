

export type initTemplateT = {
    status:boolean,
    error:boolean
}


export type initListQuizT = initTemplateT & {
    list_quiz:bodyListQuizT[]
}


export type initNewQuizT = initTemplateT & {
    list_quiz:bodyListQuizT
}


export type initStartQuizT = initTemplateT & {
    list_quiz:bodyListQuizT | null
}


export interface bodyListQuizT {
    quiz_id:string,
    quiz_name:string,
    quiz_complited:boolean,
    quiz_full_numb:number,
    quiz_active_numb:number,
    quest_list:bodyQuestT[]
}

export interface bodyQuestT{
    quest_complited:boolean,
    quest_id:string,
    quest_name:string,
    quest_answer:bodyAnswerT[]
}


export interface bodyAnswerT{
    answer_id:string,
    answer_name:string,
    answer_score:number,
    answer_user:boolean
}


