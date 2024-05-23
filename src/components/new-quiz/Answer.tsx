import { ChangeEvent } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { bodyAnswerT } from "../../redux/type"
import { newNameAnswer, newScore } from "../../redux/slices/new-quiz-slice"

interface dataPropsT {
    el: bodyAnswerT;
    quest_id: string;
  }

export function Answer({ props }: { props: dataPropsT }){
    const dispatch = useAppDispatch()
    const {el, quest_id} = props

    function nameAnswer(e: ChangeEvent<HTMLInputElement>){
        dispatch(newNameAnswer({quest_id, answer_id:el.answer_id, answer_name:e.target.value}))
    }

    function amountScore(e: ChangeEvent<HTMLInputElement>){
        if (e.target.value === '' || (!isNaN(parseInt(e.target.value)))) {
            dispatch(newScore({quest_id, answer_id:el.answer_id, answer_score:parseInt(e.target.value)}))
        }
        
    }

    
    return(
        <div className="flex items-center max-w-xs m-auto">
            <div className="flex flex-col max-w-xs m-auto my-4 w-full">
                <label htmlFor="answer">Answer</label>
                <input className="p-2 rounded-lg" type="text" id="answer" value={el.answer_name} onChange={(e) => nameAnswer(e)}/>
            </div>

            <div className="flex flex-col max-w-12 m-auto my-4 w-full ml-2">
                <label htmlFor="score">Score</label>
                <input className="p-2 rounded-lg" type="number" id="score" value={el.answer_score.toString() } onChange={(e) => amountScore(e)}/>
            </div>
        </div>
    )
}