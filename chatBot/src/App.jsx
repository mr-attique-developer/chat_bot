import { useState } from "react"
import codingIcon from "./assets/1.png"
import pythonIcon from "./assets/2.png"
import planetIcon from "./assets/3.png"
import botIcon from "./assets/4.png"
import sendIcon from "./assets/send.png"
export default function App() {

  const data = [
    {
      id:1,
      text:"What is coding ? How we can learn it.",
      icon: codingIcon,

    },
    {
      id:2,
      text:"Which is the red planet of solar system  ",
      icon: planetIcon,

    },
    {
      id:1,
      text:"In which year python was invented ? ",
      icon: pythonIcon,

    },
    {
      id:1,
      text:"How we can use the AI for adopt ? ",
      icon: botIcon,

    },
  ]

const [textMessage,setTextMessage] = useState("")
  return (
 <>
 
 <div className="  min-h-screen overflow-x-hidden w-screen bg-black text-white flex items-center justify-center flex-col">
  
  <div className="h-[80vh] flex justify-center items-center flex-col">
<h1 className="text-4xl">AssistMe</h1>

<div className="flex gap-2 mt-16 flex-wrap items-center justify-center">
  {
    data.map((item)=>(
      <>
      <div key={item.id}  className="bg-[#181818] p-4 rounded-lg relative h-36 w-48">

      <p >{item.text}</p>
      <img src={item.icon} alt="" className="absolute right-3 bottom-3" />
      </div>
      </>
    ))
  }
</div>

  </div>


  <div className=" w-[80vw] rounded-full  flex justify-between items-center bg-[#181818] p-4">
  <input value={textMessage} onChange={(e)=> setTextMessage(e.target.value)} type="text" placeholder="Write your message here..." className="px-3 rounded bg-transparent outline-none border-none" />
  {
    textMessage &&
      <button >
    <img src={sendIcon} alt="" className="w-6 " />
  </button>
  }
  
 </div>
 <p className="text-center text-[#808080] mt-3">
 AssistMe is developed by Muhammad Attique.This AI use the gemini API for giving the response  
 </p>
 </div>
 
 </>
  )
}
