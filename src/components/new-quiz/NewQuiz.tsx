import { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addNewQuiz, newName, newQuestion } from "../../redux/slices/new-quiz-slice"
import { NewQuestion } from "./NewQuestion"



export function NewQuiz() {
    const dispatch = useAppDispatch()
    const newQuitState = useAppSelector(state => state.newQuiz)


    function newQuizFunc() {
        dispatch(addNewQuiz({ data:newQuitState.list_quiz, key: 'quiz' }))
    }

    function newQuestionFunc(){
        dispatch(newQuestion())
    }

    function changeName(e: ChangeEvent<HTMLInputElement>){
        dispatch(newName(e.target.value))
    }


    return (
        <div className="bg-mainGrey p-10 rounded-lg flex flex-col w-full space-y-4">
            <div className="flex flex-col max-w-xs m-auto my-4 w-full">
                <label htmlFor="name">Name</label>
                <input value={newQuitState.list_quiz.quiz_name} className="p-2 rounded-lg" type="text" id="name" onChange={(e) => changeName(e)}/>
            </div>


            {newQuitState.list_quiz.quest_list.map(el => (
                <NewQuestion key={el.quest_id} el={el}></NewQuestion>
            ))}

            <div className="flex max-w-sm m-auto w-full justify-between" >
                <button className="p-2 bg-mainGreen text-white rounded transition-all  hover:bg-darkGreen " onClick={() => newQuestionFunc()}>
                    New Question
                </button>


                <button className="p-2 bg-mainGreen text-white rounded transition-all  hover:bg-darkGreen " onClick={() => newQuizFunc()}>
                    Deploy
                </button>

            </div>
        </div>

    )
}


