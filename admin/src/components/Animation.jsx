import React, {useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Animation = ({children}) => {
useEffect(()=>{
    Aos.init({duration: 3000})
}, [])
  return (
      <div data-aos='fade-up'>{children}</div>
  )
}

export default Animation