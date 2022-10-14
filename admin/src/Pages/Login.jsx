import React, {useState} from 'react'
import award from '../img/award.png'
import {useNavigate} from 'react-router-dom'
import { useStateContext } from '../context/AuthContext'
import {setUserSession} from '../utils/common'

const Login = () => {
const navigate = useNavigate()
 
    const {setToken, setUser} = useStateContext()
   const [state, setState] = useState([{
      email: "",
      password: ""
   }])
    const handleChange = (evt) => {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const handleSubmit = (e)=>{
    e.preventDefault();
        console.log(state)
    let fetchLogin = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", `Bearer ${auth.token}`);
       let response = await fetch(
        "https://adca-api.onrender.com/api/admin/login",
        {
          method: "post",
          headers: myHeaders,
          body: JSON.stringify({
          email: state.email,
          password: state.password
          })
        }
      );
      let data = await response.json();
      setUser(data)
      navigate('/')
      setState('')
      Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = ""));
    }
      fetchLogin();
}

  return (
      <div className='md:flex h-screen'>
          <aside className="md:w-[50%] flex justify-center items-center bg-[#151313]">
              <img src={award} alt="logo" />
          </aside>
          <div className="md:w-[50%] mx-auto flex justify-center items-center">
              <div className="text-center md:p-[80px] p-[20px] md:pt-[80px] pt-[40px]">
                  <h3 className='text-[24px] font-[400]'>Welcome Admin</h3>
                  <p className='mt-[8px] mb-[32px] text-[16px] font-[400]'>Login to the Dashboard</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-inp mt-[24px] md:w-[560px]">
                <label htmlFor="email" className='font-[400] text-[20px]  md:text-[24px]'>Email Address</label>
                <input required type="email" id='email' className='w-full h-[56px] border-none mt-[8px] p-[16px]' style={{background: '#FFFFFF', boxShadow:' 4px 4px 8px rgba(0, 0, 0, 0.16)', borderRadius: '8px'}} placeholder='Email Address' name='email' value={state.email} onChange={handleChange}   />
              </div>
              <div className="form-inp mt-[24px] md:w-[560px]">
                <label htmlFor="password" className='font-[400] text-[20px]  md:text-[24px]'>Password</label>
                <input required type="password" id='password' className='w-full h-[56px] border-none mt-[8px] p-[16px]' style={{background: '#FFFFFF', boxShadow:' 4px 4px 8px rgba(0, 0, 0, 0.16)', borderRadius: '8px'}} placeholder='Password' name='password' value={state.password} onChange={handleChange}   />
              </div>
                      <div className="w-4/5 md:w-[560px] md:mt-[40px] mx-auto md:mx-0">
              <button type='submit' className='h-[56px] font-[600] text-[20px] md:text-[24px] text-black w-full bg-primary hover:bg-primary mt-[36px] rounded-full'>
               Login
                    </button>
                    </div>
              </form>
            </div>
          </div>
          
    </div>
  )
}
export default Login