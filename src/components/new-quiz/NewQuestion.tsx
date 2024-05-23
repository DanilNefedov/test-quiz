import { ChangeEvent } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { newAnswer, newNameQuestion, newQuestion } from "../../redux/slices/new-quiz-slice"
import { bodyQuestT } from "../../redux/type"
import { Answer } from "./Answer"


interface dataPropsT {
    el: bodyQuestT
}

export function NewQuestion({ el }: dataPropsT) {
    const { quest_answer, quest_complited, quest_id, quest_name } = el
    const dispatch = useAppDispatch()


    function newAnswerFunc(){
        dispatch(newAnswer(quest_id))
    }

    function questionName (e: ChangeEvent<HTMLInputElement>){
        dispatch(newNameQuestion({quest_id, quest_name:e.target.value}))
    }

    return (
        <div className="border-t-2 border-black border-solid">
            <div className="flex flex-col max-w-xs m-auto my-4 w-full">
                <label htmlFor="question">Question</label>
                <input className="p-2 rounded-lg" type="text" id="question" value={quest_name} onChange={(e) => questionName(e)}/>
            </div>
            
            

            {quest_answer.map(el => (
                <Answer key={el.answer_id} props={{ el, quest_id }}/>
            ))}

            <button className="block m-auto p-2 bg-mainGreen text-white rounded transition-all  hover:bg-darkGreen" onClick={() => newAnswerFunc()}>
                New Answer
            </button>

        </div>

    )
}