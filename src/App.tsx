import Quiz from './components/Quiz'
import Result from './components/Result'
import { useState } from 'react'

function App() {
  const [showQuiz, setShowQuiz] = useState(true)
  const [score, setScore] = useState(0)
  const [intro, setIntro] = useState(true)

  return (
    <div className="bg-[#f6e37a] min-h-screen p-5 grid place-items-center bg-[url('./assets/bg3.webp')]">
      {showQuiz && intro && (
        <button
          onClick={() => setIntro(false)}
          className="bg-white animate-appear rounded px-5 py-2 font-medium text-amber-500 shadow-md"
        >
          Start Quiz
        </button>
      )}
      {showQuiz && !intro && <Quiz show={setShowQuiz} setScore={setScore} />}
      {!showQuiz && (
        <Result score={score} setIntro={setIntro} setShowQuiz={setShowQuiz} setScore={setScore} />
      )}
    </div>
  )
}

export default App
