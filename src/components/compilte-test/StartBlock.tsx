import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { StartQuestBlock } from "./StartQuestBlock"
import { fetchComplite, handlNumbAnswer } from "../../redux/slices/start-quiz-slice"
import { bodyQuestT } from "../../redux/type"




export function StartBlock() {
    const startQuitState = useAppSelector(state => state.startQuiz)
    const dispatch = useAppDispatch()
    const activeNumbPage = startQuitState.list_quiz?.quiz_active_numb as number

    const questList = startQuitState.list_quiz?.quest_list[activeNumbPage] as bodyQuestT;
    const maxScore = Math.max(...questList.quest_answer.map(answer => answer.answer_score));
    

    function handleNextClick() {
        dispatch(handlNumbAnswer(activeNumbPage + 1))
    };

    function handlePrevClick() {
        dispatch(handlNumbAnswer(activeNumbPage - 1))
    }


    function handlComplite() {
        if (!startQuitState.list_quiz?.quiz_complited) {
            dispatch(fetchComplite({
                quiz_id: startQuitState.list_quiz?.quiz_id as string,
                quiz_complited: true,
                key: 'quiz',
                quest_list: startQuitState.list_quiz?.quest_list as bodyQuestT[]
            }))
        }



    }


    return (
        <div className="bg-mainGrey p-10 rounded-lg w-full mx-2 my-2 " >
            <p className="font-bold text-4xl pb-2">{startQuitState.list_quiz?.quiz_name}</p>

            <div className="flex text-xl pb-4">
                <p>Question {activeNumbPage + 1}  of {startQuitState.list_quiz?.quiz_full_numb}</p>
            </div>
            {startQuitState.list_quiz && startQuitState.list_quiz.quest_list[activeNumbPage] && (
                <StartQuestBlock
                    key={startQuitState.list_quiz?.quest_list[activeNumbPage].quest_id}
                    el={{ data: startQuitState.list_quiz?.quest_list[activeNumbPage], quiz_complited: startQuitState.list_quiz.quiz_complited, maxScore }}
                ></StartQuestBlock>
            )}
           
            <div className="flex justify-between mt-4">
                {startQuitState.list_quiz?.quest_list.length as number - 1 > activeNumbPage ?
                    <button className="p-2 bg-mainGreen text-white rounded transition-all hover:bg-darkGreen" onClick={() => handleNextClick()}>Next</button>
                    :
                    <></>
                }

                {activeNumbPage === startQuitState.list_quiz?.quest_list.length as number - 1 ?
                    <button className="p-2 bg-mainGreen text-white rounded transition-all hover:bg-darkGreen ml-auto" onClick={() => handlePrevClick()}>Prev</button>
                    :
                    <></>
                }

            </div>

            {startQuitState.list_quiz?.quest_list.length as number - 1 === activeNumbPage ?
                <button className="p-2 bg-mainGreen text-white rounded transition-all hover:bg-darkGreen m-auto block mt-4" onClick={() => handlComplite()}>Complited</button>
                :
                <></>
            }


        </div>
    )
}