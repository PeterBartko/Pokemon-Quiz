import { FaCrown } from "react-icons/fa"
import { result } from '../../types'

const colorize = (score: number) => {
  if (score < 3) return ({color: '#d12929'})
  else if (score == 3) return ({color: '#29c1d1'})
  else return ({color: '#29d166'})
}

const Result: React.FC<result> = ({score, setIntro, setShowQuiz, setScore}) => {
  
  const replay = () => {
    setShowQuiz(true)
    setScore(0)
  }
  
  const quit = () => {
    setShowQuiz(true)
    setIntro(true)
    setScore(0)
  }

  return (
    <div className="w-[25rem] pt-4 pb-7 bg-white rounded shadow-xl flex items-center justify-center flex-col gap-3 py-3 animate-appear">
      <FaCrown size={100} color={colorize(score).color} />
      <h2 className="font-bold text-xl">You've completed the Quiz</h2>
      <h3 className="font-bold text-md flex gap-1">You got <p style={colorize(score)}>{score}</p> out of 10</h3>
      <div className="space-x-4">
        <button onClick={replay} className="btn">Replay Quiz</button>
        <button onClick={quit} className="btn bg-white text-amber-500 border-2 py-[.31rem] px-[14px] border-amber-500">Quit Quiz</button>
      </div>      
    </div>
  )
}

export default Result