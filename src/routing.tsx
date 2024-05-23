
// export async function loaderEdit({ params }:{params:any}) {
import App from "./App";
import { NewQuiz } from "./components/new-quiz/NewQuiz";
import { Layout } from "./layout";
import { createBrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { fetchAllQuiz } from "./redux/slices/list-quiz-slice";

//   const data = () => store.dispatch(fetchEditNotes(params.id))
//   return data()
// }



export const router = createBrowserRouter([
    {
      element: <Layout></Layout>,
    //   errorElement:<Errors props={'Try reloading the page or checking your connection. You may also have entered the wrong link.'}></Errors>,
      children:[
        {
          path:'/',
          element:<App></App>,
          // errorElement:<Errors props={'Try reloading the page or checking the link.'}></Errors>,
          loader:() => store.dispatch(fetchAllQuiz('quiz')),
          
        },
        {
          path:'/new-quiz',
        //   errorElement:<Errors props={"Try reloading the page. This note may not exist."}></Errors>,
          element:<NewQuiz></NewQuiz>,
        //   loader:loaderEdit
        },
        {
          path:'/edit/:id',
        //   errorElement:<Errors props={"Try reloading the page. This note may not exist."}></Errors>,
          element:<NewQuiz></NewQuiz>,
        //   loader:loaderEdit
        },
        {
          path:'/quiz/:id',
        //   errorElement:<Errors props={"Try reloading the page. This note may not exist."}></Errors>,
          element:<NewQuiz></NewQuiz>,
        //   loader:loaderEdit
        }
      ]
    },
    {
    //   element:<Errors props={'Try reloading the page or checking the link.'}></Errors>,
      path:'*'
    }
]);