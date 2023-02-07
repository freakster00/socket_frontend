import { nanoid } from "nanoid"
import { useState,useEffect } from "react"
import { io } from "socket.io-client"

const index = () => {

  const socket=io('http://localhost:3001')
  const [message,setMessage]=useState("")
  const [chat,setChat]=useState([])

  const sendChat=(e)=>{
    e.preventDefault()
    socket.emit("createMessage",{def:message})
    setMessage('')
  }
  useEffect(() => {
    socket.on("message",(payload)=>{
      setChat([...chat,payload])
      
    })
  })
  
  return (
    <div>
      <div>
       
        {chat.map((payload,index)=>{
           
          return(
           
            <p key={index}>{payload.def}</p>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" name="message" placeholder="Enter Your Message" value={message} onChange={(e)=>{
            e.preventDefault()
            setMessage(e.target.value)
          }
          }/>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default index