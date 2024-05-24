import { ChangeEvent } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { deleteQuestionReducer, newAnswer, newNameQuestion, } from "../../redux/slices/new-quiz-slice"
import { bodyQuestT } from "../../redux/type"
import { Answer } from "./Answer"
import { useLocation, } from "react-router-dom"


interface dataPropsT {
    el: bodyQuestT
}

export function NewQuestion({ el }: dataPropsT) {
    const { quest_answer, quest_complited, quest_id, quest_name } = el
    const dispatch = useAppDispatch()
    const navigation = useLocation();
    const subStr = navigation.pathname.split('/')[1];

    function newAnswerFunc() {
        dispatch(newAnswer(quest_id))

    }

    function questionName(e: ChangeEvent<HTMLInputElement>) {
        dispatch(newNameQuestion({ quest_id, quest_name: e.target.value }))

    }

    function deleteQuestion() {
        dispatch(deleteQuestionReducer(quest_id))

    }


    return (
        <div className="border-t-2 border-black border-solid pb-2">
            <div className="flex flex-col max-w-xs m-auto my-4 w-full relative">
                <label htmlFor="question">Question</label>

                <input className="p-2 rounded-lg" type="text" id="question" value={quest_name} onChange={(e) => questionName(e)} />
                <button className="absolute top-0 right-[-35px]" onClick={() => deleteQuestion()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>



            {quest_answer.map(el => (
                <Answer key={el.answer_id} props={{ el, quest_id, subStr }} />
            ))}

            <button className="block m-auto p-2 bg-mainGreen text-white rounded transition-all  hover:bg-darkGreen" onClick={() => newAnswerFunc()}>
                New Answer
            </button>



        </div>

    )
}