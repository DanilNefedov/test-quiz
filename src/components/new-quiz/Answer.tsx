import { ChangeEvent } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { bodyAnswerT } from "../../redux/type"
import { deleteAnswerReducer, newNameAnswer, newScore } from "../../redux/slices/new-quiz-slice"

interface dataPropsT {
    el: bodyAnswerT;
    quest_id: string;
    subStr:string
}

export function Answer({ props }: { props: dataPropsT }) {
    const dispatch = useAppDispatch()
    const { el, quest_id, subStr } = props

    function nameAnswer(e: ChangeEvent<HTMLInputElement>) {
            dispatch(newNameAnswer({ quest_id, answer_id: el.answer_id, answer_name: e.target.value }))
        
    }

    function amountScore(e: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);

        if (e.target.value === '' || (!isNaN(value) && value >= 0 && value <= 10)) {
                dispatch(newScore({ quest_id, answer_id: el.answer_id, answer_score: value }));
            
        }
    }

    function deleteAnswerFunc() {
        dispatch(deleteAnswerReducer({ quest_id, answer_id: el.answer_id }))
        
    }


    return (
        <div className="flex items-center max-w-xs m-auto">
            <div className="flex flex-col max-w-xs m-auto my-4 w-full">
                <label htmlFor="answer">Answer</label>
                <input className="p-2 rounded-lg" type="text" id="answer" value={el.answer_name} onChange={(e) => nameAnswer(e)} />
            </div>

            <div className="flex flex-col max-w-12 m-auto my-4 w-full ml-2">
                <label htmlFor="score">Score</label>
                <input className="p-2 rounded-lg" type="number" id="score" value={el.answer_score.toString()} onChange={(e) => amountScore(e)} />
            </div>

            <button className="flex-end mt-[25px]" onClick={() => deleteAnswerFunc()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}