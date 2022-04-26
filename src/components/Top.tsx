import { top } from '../../types'

const Top: React.FC<top> = ({time}) => {
  return (
    <div className="h-[4rem]">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="font-bold text-xl">Pokemon Quiz</h1>
        <div className="flex items-center rounded-md bg-amber-200 gap-2 px-3 py-[.4rem] border border-amber-400">
          <p className="text-amber-600 text-lg">Time Left</p>
          <p className="bg-black/80 rounded-md px-3 py-[.15rem] text-white">{time < 10 ? '0' + time : time}</p>
        </div>
      </div>
    </div>
  )
}

export default Top