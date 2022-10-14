import React, {useState, useEffect} from 'react'
import Animation from "../components/Animation";

const CreateSubCategories = () => {
    const [state, setState] = useState([{
        category: "",
        subcategory: ""
    }])
    const [categories, setCategories] = useState(null)
   const handleChange = (evt) => {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  setState({
    ...state,
    [evt.target.name]: value
  });
    }


    const fetchCategories = async () => {
    const response = await fetch(
      `https://adca-api.onrender.com/api/categories`
    );
    const data = await response.json();
    setCategories(data);
    console.log(data);
  };

  useEffect(() => {
        fetchCategories();
     return () => {
       fetchCategories()
    }
  }, []);


    const handleSubmit = (e) => {
    e.preventDefault();
    let createCategory = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", `Bearer ${auth.token}`);
      // myHeaders.append("Authorization", `Bearer rnd_cR8FjAwOCy9lBAQjeMzH8I4WN4xI`);
      let response = await fetch(
        "https://adca-api.onrender.com/api/subcategories",
        {
          method: "post",
          headers: myHeaders,
          body: JSON.stringify({
          category: state.category,
          subcategory: state.subcategory,
          }),
        }
      );
      let data = await response.json();
      console.log(data);
      setState('')
    };
    createCategory();
  }


  return (
    <Animation>
      <div className='dark:bg-main-dark-bg dark:text-white h-screen'>
          <form onSubmit={handleSubmit}>
              <div className="md:w-[1041px]  pt-[80px] md:pt-[56px]">
                  <div className="pl-[20px] w-5/6 md:pl-[161px] mx-auto md:mx-0">
                      <h1 className='font-[600] text-[24px] '>create subcategory</h1>
                      {
                          categories && categories.map((category) => (
                              <div className="mt-[24px] " key={category._id}>
                                  <input required type="radio" name='category'  id={category.category} value={category.category} checked={state.category === category.category} onChange={handleChange}  />
                        <label htmlFor={category.category} className='ml-[12px] font-[400] text-[16px] leading-6' >{category.category}</label>
                  </div>
                          ))
                      }
                  
                      </div>
                  <div className="w-5/6 md:w-[720px] mt-[32px] md:h-[340px] mx-auto flex flex-col items-center justify-center py-[40px] md:py-0" style={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                   <div className="form-inp w-4/5 md:w-[560px]" >
                <label htmlFor="name" className='font-[400] text-[20px]  md:text-[24px]'>Category</label>
                <input required type="text" id='name' className='w-full h-[56px] border-none mt-[8px] p-[16px]' style={{background: '#FFFFFF', boxShadow:' 4px 4px 8px rgba(0, 0, 0, 0.16)', borderRadius: '8px'}} placeholder='Award Subcategory' name='subcategory'  value={state.subcategory} onChange={handleChange}  />
                      </div>
                      <div className="w-4/5 md:w-[560px] md:mt-[40px] mx-auto md:mx-0">
              <button type='submit' className='h-[56px] font-[600] text-[20px] md:text-[24px] text-black w-full bg-primary hover:bg-primary mt-[36px] rounded-full'>
                Create Subcategory
                    </button>
                    </div>
                  </div>
                  </div>
              </form>
    </div>
    </Animation>
  )
}

export default CreateSubCategories