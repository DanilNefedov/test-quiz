import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { BlockQuize } from './components/new-quiz/BlockQuiz';

function App() {
  const dispatch = useAppDispatch()
  const listQuiz = useAppSelector(state => state.listQuiz)

  console.log(listQuiz.list_quiz)

  return (
    <main className="container flex flex-wrap">
      {listQuiz.list_quiz.map(el => (
        <BlockQuize key={el.quiz_id} props={el}></BlockQuize>
      ))}
    </main>
  );
}

export default App;
