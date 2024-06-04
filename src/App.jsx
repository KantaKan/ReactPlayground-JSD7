import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleCount = () => {
    setCount(prev => prev + 1)
  }
  const decreaseCount = () => {
    setCount(prev => prev - 1)
  }
  return (
    <>     
    <div className=' justify-evenly flex text-4xl bg-yellow-300 font-extrabold text-indigo-400'>{count}</div>
    <CardComp  decreaseCount={decreaseCount} counthandle={handleCount}/>
    <IsToggled />
    <Currenttime />
    </>
  )
}


const CardComp = ({counthandle,decreaseCount}) => {
  
  return (
    <div className='flex justify-center h-42 bg-green-300  h-24'>

      <h2 className=' self-center'>Hello h2</h2>
      <button className="bg-slate-500 h-7 self-end" onClick={counthandle} type='button' value="text" >+1</button>
      <button className='self-start bg-orange-300' onClick={decreaseCount} type='button' value="text" >-1</button>
    </div>
  )
}

const IsToggled = () => {
  const [toggled , setToggled] = useState(false)
  const toggledhandler = () => {
    setToggled(!toggled)
  }
  return (
      <div className='bg-pink-200 flex-col  text-center'>
        <button className='bg-orange-400 hover:bg-orange-600 font-bold text-white rounded-md' onClick={toggledhandler} type='button'>
          {toggled ? "Hide" : "Show" } Message
        </button>
        {toggled && <h2>Hello this is toggled</h2>}
      </div>
  )
}



const Currenttime = () => {
  const [wtime,setCurrenttime] = useState(new Date().toLocaleTimeString())
  const [greetTime,setGreetTime] = useState("")
  const gettime = () => {
   const hour = new Date().getHours()
   if(hour < 12 ) {setGreetTime("Good Morning")
   }else if(hour > 12 ) { setGreetTime("Good Afternoon") 
  } else {
    setGreetTime("Good Evening")
  }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrenttime(new Date().toLocaleTimeString())
    },1000)
    gettime()
    return () => clearInterval(intervalID)
  },[])

  return (
    <>

    <div className='font-bold text-4xl flex justify-around  bg-blue-300 text-white'>{wtime} {greetTime} </div>
    
    </>
  )
}



export default App
