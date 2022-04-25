export interface comp {
  num: number,
  setNum: React.Dispatch<React.SetStateAction<number>>
}

export interface result {
  score: number,
  setIntro: React.Dispatch<React.SetStateAction<boolean>>,
  setShowQuiz: React.Dispatch<React.SetStateAction<boolean>>,
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export interface quiz {
  show: React.Dispatch<React.SetStateAction<boolean>>,
  setScore: React.Dispatch<React.SetStateAction<number>>
}

export interface top {
  time: number
}

export interface question {
  answer: string
  questions: string[]
  img: string
}