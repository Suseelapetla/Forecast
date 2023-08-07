import { useState } from 'react'
import Weather from './components/weather'
import dateFormat from 'dateformat'
import './App.css'

function App() {

  const [time, setTime] = useState("")

  const now = new Date()
  setTimeout(() => {
    setTime(now)
  },1000)
  
  return (
    <>
      <div className='header'>
          <li>{dateFormat(now,"dd mmmm yyyy")}</li>
          <li>{dateFormat(time,"hh:MM TT")}</li>
      </div>
      <Weather />
    </>
  )
}

export default App
