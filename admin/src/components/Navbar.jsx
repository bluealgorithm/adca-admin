import React, {useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import {FaToggleOn, FaToggleOff} from 'react-icons/fa'
import avatar from '../img/avatar.jpg'
// import {Cart, Chat, Notification, UserProfile} from '.'
import { useStateContext } from '../context/AuthContext'


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray' >
      <span style={{backgroundColor: dotColor}} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
        {icon}
    </button>
)
const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, darkToggle, setDarkToggle } = useStateContext()
  
  useEffect(() => {
    const handleResize = ()=>setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)
  
    handleResize()
    return ()=> window.removeEventListener('resize', handleResize)
  }, [])
  
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    }
    else {
      setActiveMenu(true)
    }
  }, [screenSize])
  
  return (
    <div className='flex justify-between p-2 md:mx-6 relative '>
      <NavButton title='Menu' customFunc={() => setActiveMenu((prevState) => !prevState)} color='blue' icon={<AiOutlineMenu />} />
      
      <div className='flex'>
        {
          darkToggle ? 
            <NavButton title='Mode' customFunc={() => setDarkToggle((prevState) => !prevState)} color='white' icon={<FaToggleOn />} dotColor='black'  />
            :
             <NavButton title='Mode' customFunc={() => setDarkToggle((prevState) => !prevState)} color='blue' icon={<FaToggleOff />} />
        }
        {/* <NavButton title='Chat' dotColor='#03c9D7' customFunc={() => handleClick('chat')} color='blue' icon={<BsChatLeft />} /> */}
        <NavButton title='Notifications' dotColor='#03c9D7' customFunc={() => handleClick('notification')} color='blue' icon={<RiNotification3Line />} />
          <div className="flex items-center gap-2 cursor-pointer hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
            <img src={avatar} alt="avatar" className='rounded-full w-8 h-8' />
            <p>
              <span className='text-gray-400 text-14'>H1, </span>
              <span className='text-gray-400 text-14 font-bold ml-1' >Admin</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14 ' />
          </div>
        {/* { isClicked.cart && <Cart /> }
        { isClicked.chat && <Chat /> }
        { isClicked.notification && <Notification /> }
        { isClicked.userProfile && <UserProfile /> } */}
      </div>
    </div>
  )
}

export default Navbar
