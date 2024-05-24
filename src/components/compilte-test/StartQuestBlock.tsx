import { useState } from "react";
import { bodyAnswerT, bodyQuestT } from "../../redux/type";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkAnswerReducer } from "../../redux/slices/start-quiz-slice";

interface dataPropsT {
    data:bodyQuestT,
    quiz_complited:boolean,
    maxScore:number
}

export function StartQuestBlock({ el }: { el: dataPropsT }) {
    const {data, quiz_complited, maxScore} = el
    const dispatch = useAppDispatch()

    function checkAnswer(elem:bodyAnswerT) {
        if(!quiz_complited){
            dispatch(checkAnswerReducer({quest_id:data.quest_id, answer_id:elem.answer_id, answer_user:elem.answer_user}))
        }
    }

    function color(elem:bodyAnswerT):string{
        if(quiz_complited){
            return maxScore === elem.answer_score ? 'bg-mainGreen' : elem.answer_score > 0 ? 'bg-lightGreen' : 'bg-mainRed'
        }else{
            return''
        }
    }

    return (
        <div className="b">
            <p className="pb-4">{data.quest_name}</p>
            {data.quest_answer.map(elem => (
                <div key={elem.answer_id} className={`${color(elem)} my-4 flex items-center`}>
                    <label className='flex w-fit cursor-pointer p-2' htmlFor={elem.answer_id} onClick={() => checkAnswer(elem)}>
                        {
                        elem.answer_user ?
                            <span className="pr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </span>
                            :
                            <span className="pr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
                                </svg>

                            </span>

                    }
                        <span>{elem.answer_name}</span>
                    </label>

                    {quiz_complited ? 
                    <span className="ml-auto pr-2 text-white">{elem.answer_score}</span> 
                    :<></>   
                    }
                </div>
            ))}
        </div>
    )
}