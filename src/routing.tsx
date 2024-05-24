
// export async function loaderEdit({ params }:{params:any}) {
import App from "./App";
import { NewQuiz } from "./components/new-quiz/NewQuiz";
import { Layout } from "./layout";
import { createBrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { fetchAllQuiz } from "./redux/slices/list-quiz-slice";
import { StartBlock } from "./components/compilte-test/StartBlock";
import { fetchStartQuiz } from "./redux/slices/start-quiz-slice";


export async function loaderStart({ params }:{params:any}) {

  const data = () => store.dispatch(fetchStartQuiz({quiz_id:params.id, key:'quiz'}))
  return data()
}






export const router = createBrowserRouter([
    {
      element: <Layout></Layout>,
      children:[
        {
          path:'/test-quiz/',
          element:<App></App>,
          loader:() => store.dispatch(fetchAllQuiz('quiz')),
          
        },
        {
          path:'/test-quiz/new-quiz',
          element:<NewQuiz></NewQuiz>,
        },
       
        {
          path:'/test-quiz/quiz/:id',
          element:<StartBlock></StartBlock>,
          loader:loaderStart
        }
      ]
    },
    {
      path:'*'
    }
]);