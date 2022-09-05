import Top from './Top'
import { PokemonClient } from 'pokenode-ts'
import Pokemons from 'pokemon'
import { BsXCircle as Wrong, BsCheckCircle as Right } from 'react-icons/bs'
import { useState, createRef, useEffect, useRef } from 'react'
import { quiz, question } from '../../types'
import { motion, useAnimation } from 'framer-motion'

const chooseRandom = (arr: string[]) => {
  const res = []
  for (let i = 0; i < 4; ) {
    const rand = Math.floor(Math.random() * arr.length)
    if (res.indexOf(arr[rand]) !== -1) continue
    res.push(arr[rand])
    i++
  }
  return res
}

const Quiz: React.FC<quiz> = ({ show, setScore }) => {
  const [icko, setIcko] = useState(0)
  const [done, setDone] = useState(false)
  const [time, setTime] = useState(15)
  const [questionData, setQuestionData] = useState<question>(null)
  const control = useAnimation()

  const img = useRef()

  const ques = useRef([])
  ques.current = [...Array(4)].map((_, i) => ques.current[i] ?? createRef())

  const api = new PokemonClient()
  const allPokemonNames = Pokemons.all().slice(0, -7)
  let interval: number

  useEffect(() => {
    control.set({ pathLength: 1 })
    control.start({ pathLength: 0, transition: { duration: 15, ease: 'linear' } })
  }, [])

  useEffect(() => {
    if (!questionData) createQuestion()
    interval = setInterval(() => setTime(t => t - 1), 1000)

    if (time == 0) {
      if (!done) {
        ques.current.forEach(q => {
          if (q.current?.innerText !== questionData.answer) {
            q.current?.classList.add('opacity-30')
          }
        })
      }
      clearInterval(interval)
      setDone(true)
    }

    return () => clearInterval(interval)
  }, [time, icko])

  const createQuestion = async () => {
    const questions = chooseRandom(allPokemonNames)

    const answer = questions[Math.floor(Math.random() * 4)]
    const pokemon = api.getPokemonById(Pokemons.getId(answer))

    setQuestionData({
      answer,
      questions,
      img: (await pokemon).sprites.other['official-artwork'].front_default,
    })
  }

  const check = (e: any) => {
    if (done || time == 0) return
    if (e.target.innerText == questionData.answer) {
      e.target.classList.add('right')
      e.target.children[0].classList.remove('hidden')
      setScore(s => s + 1)
    } else {
      e.target.classList.add('wrong')
      e.target.children[0].classList.remove('hidden')
    }
    ques.current.forEach(q => {
      if (q.current?.innerText === questionData.answer) {
        q.current?.classList.add('right')
        q.current?.children[0].classList.remove('hidden')
      }
    })
    clearInterval(interval)
    setDone(d => {
      if (!d) control.stop()
      return !d
    })
  }

  const next = () => {
    if (icko == 9) {
      show(false)
      return
    }

    ques.current.forEach(q => {
      q.current?.classList.remove('right', 'wrong', 'opacity-30')
      q.current?.children[0].classList.add('hidden')
    })

    setTime(15)
    setDone(false)
    setIcko(icko + 1)

    control.set({ pathLength: 1 })
    control.start({ pathLength: 0, transition: { duration: 15, ease: 'linear' } })

    createQuestion()
  }

  return (
    <div className="rounded shadow-xl flex flex-col w-full max-w-[30rem] bg-[#fff5bbcc] backdrop-blur animate-appear ">
      <Top time={time} />
      <svg height="4" width="100%" className="bg-orange-300/50">
        <motion.line
          animate={control}
          x1="0"
          y1="2"
          x2="100%"
          y2="2"
          stroke="#f97316"
          strokeWidth="4"
        />
      </svg>

      <div className="max-h-[260px] h-full">
        {questionData && (
          <img
            src={questionData.img}
            alt="pokemon sprite"
            className="w-full h-full max-w-[260px] mx-auto"
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
        {questionData &&
          questionData.questions.map((name, i) => {
            return (
              <div
                onClick={e => check(e)}
                key={name}
                ref={ques.current[i]}
                className="ans flex items-center justify-between"
              >
                {name}
                {name === questionData.answer ? (
                  <Right size={20} className="text-green-400 hidden" />
                ) : (
                  <Wrong size={20} className="text-red-400 hidden" />
                )}
              </div>
            )
          })}
      </div>
      <div className="h-[.15rem] mt-auto bg-orange-300/50"></div>
      <div className="p-2 px-6 flex items-center justify-between">
        <div className="flex gap-1 py-[.4rem]">
          <p className="font-bold">{icko + 1}</p> of <p className="font-bold">10</p>
          <p className="hidden mb:block">Questions</p>
        </div>
        {done && (
          <button onClick={next} className="btn animate-appear">
            Next Pokemon
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz
