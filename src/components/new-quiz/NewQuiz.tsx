import { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addNewQuiz, newName, newQuestion } from "../../redux/slices/new-quiz-slice"
import { NewQuestion } from "./NewQuestion"



export function NewQuiz() {
    const dispatch = useAppDispatch()
    const newQuitState = useAppSelector(state => state.newQuiz)


    function newQuizFunc() {
        const data = {
            quiz_id: '1',
            quiz_name: 'name1',
            quiz_full_numb: 3,
            quiz_active_numb: 0,
            quiz_complited: false,
            quest_list: [
                {
                    quest_complited: false, quest_id: '11', quest_name: 'test1',
                    quest_answer: [
                        { answer_id: '111', answer_name: 'ssss', answer_score: 0 },
                        { answer_id: '1121', answer_name: 'sss2342s', answer_score: 2 },
                        { answer_id: '1141', answer_name: 'sss23423s', answer_score: 1 },
                        { answer_id: '11241', answer_name: 'sss234223423s', answer_score: 3 },
                    ]
                },

                {
                    quest_complited: false, quest_id: '121', quest_name: 'test2',
                    quest_answer: [
                        { answer_id: '1121', answer_name: 'ssss', answer_score: 1 },
                        { answer_id: '11221', answer_name: 'sss2342s', answer_score: 0 },
                        { answer_id: '11241', answer_name: 'sss23423s', answer_score: 2 },
                        { answer_id: '112241', answer_name: 'sss234223423s', answer_score: 3 },
                    ]
                },
                {
                    quest_complited: false, quest_id: '4121', quest_name: 'test2',
                    quest_answer: [
                        { answer_id: '11421', answer_name: 'ssss', answer_score: 1 },
                        { answer_id: '114221', answer_name: 'sss2342s', answer_score: 2 },
                        { answer_id: '112441', answer_name: 'sss23423s', answer_score: 3 },
                        { answer_id: '1122441', answer_name: 'sss234223423s', answer_score: 0 },
                    ]
                }
            ]
        }

        dispatch(addNewQuiz({ data, key: 'quiz' }))
    }

    function newQuestionFunc(){
        dispatch(newQuestion())
    }

    function changeName(e: ChangeEvent<HTMLInputElement>){
        dispatch(newName(e.target.value))
    }


    console.log(newQuitState)
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

                {/* <button className=" p-2 bg-mainGreen text-white rounded transition-all  hover:bg-darkGreen mx-2" onClick={() => newAnswerFunc()}>
                    New Answer
                </button> */}

                <button className="p-2 bg-mainGreen text-white rounded transition-all  hover:bg-darkGreen " onClick={() => newQuizFunc()}>
                    Deploy
                </button>

            </div>
        </div>

    )
}


