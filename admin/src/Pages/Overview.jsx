import React, {useState, useEffect} from 'react'
import { DiGoogleAnalytics } from 'react-icons/di'
import { ImUsers } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import {Link} from 'react-router-dom'
import Animation from "../components/Animation";

const Card = ({icon, figure, title, middle}) => (
                <div className={`${middle && 'my-[20px] md:my-0'} box w-[245px] h-[150px] flex flex-col justify-center items-center dark:border dark:border-gray-200`} style={{boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'}}>
                  <div className="flex gap-[18px]">
            {icon}  <span className='text-[24px] font-[400]'>{title}</span>
                  </div>
                  <p className='font-[700] text-[24px]'>{figure }</p>
              </div>
)
const Overview = () => {
    const [nominees, setNominees] = useState('')
    const [categories, setCategories] = useState('')
     const fetchSubCategories = async () => {
    const response = await fetch(
      `https://adca-api.onrender.com/api/categories`
    );
    const data = await response.json();
    setCategories(data.length);
    console.log(data.length);
  };

  useEffect(() => {
        fetchSubCategories();
     return () => {
       fetchSubCategories()
    }
  }, []);
    
      const fetchNominees = async () => {
    const response = await fetch(
      `https://adca-api.onrender.com/api/nominations/`
    );
    const data = await response.json();
    setNominees(data.length);
    console.log(data.length);
  };
  useEffect(() => {
    fetchNominees();
    return () => {
      fetchNominees();
    };
  }, []);
  return (
      <div className='dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white h-screen'>
        <Animation>
          <div className="md:p-[40px] md:flex gap-[30px] pt-[80px] md:pt-[40px] w-5/6 mx-auto">
              <Link to='/voters'>
                  <Card icon={<DiGoogleAnalytics size={32} />} figure='24' title='Total Votes' />
              </Link>
               <Link to='/nominees'>
                  <Card icon={<ImUsers size={32} />} figure={nominees} middle title='Nominees'  />
              </Link>
               <Link to='/categories'>
                  <Card icon={<HiOutlineUserGroup size={32} />} figure={categories} title='Categories' />
              </Link>
              
          </div>
          </Animation>
    </div>
  )
}

export default Overview