import React, { useState, useEffect } from "react";
import { url } from "../url";
import Animation from "../components/Animation";

const CreateCategories = () => {
  const [btnText, setBtnText] = useState(false);
  const [state, setState] = useState([
    {
      nomineeType: "",
      category: "",
      description: "",
    },
  ]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleChange = (evt) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let createCategory = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", `Bearer ${auth.token}`);
      // myHeaders.append("Authorization", `Bearer rnd_cR8FjAwOCy9lBAQjeMzH8I4WN4xI`);
      let response = await fetch(`${url}/categories`, {
        method: "post",
        headers: myHeaders,
        body: JSON.stringify({
          nomineeType: state.nomineeType,
          category: state.category,
          description: state.description,
        }),
      });
      let data = await response.json();
      // console.log(data);
      setState("");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    };
    createCategory();
  };

  return (
    <Animation>
      <div className="dark:bg-main-dark-bg dark:text-white">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[1041px]  pt-[80px] md:pt-[56px]  ">
            <div className="pl-[20px] w-5/6 md:pl-[161px] mx-auto md:mx-0">
              <h1 className="font-[600] text-[24px] ">create categories</h1>
              <div className="mt-[24px] ">
                <input
                  required
                  type="radio"
                  name="nomineeType"
                  id="individual"
                  value="An individual"
                  checked={state.nomineeType === "An individual"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="individual"
                  className="ml-[12px] font-[400] text-[16px] leading-6"
                >
                  An individual
                </label>
              </div>
              <div className="">
                <input
                  required
                  type="radio"
                  name="nomineeType"
                  id="group"
                  value="A group"
                  checked={state.nomineeType === "A group"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="group"
                  className="ml-[12px] font-[400] text-[16px] leading-6"
                >
                  A group
                </label>
              </div>
              <div className="">
                <input
                  required
                  type="radio"
                  name="nomineeType"
                  id="organization"
                  value="An organization"
                  checked={state.nomineeType === "An organization"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="organization"
                  className="ml-[12px] font-[400] text-[16px] leading-6"
                >
                  An organization{" "}
                </label>
              </div>
            </div>
            <div
              className="w-5/6 md:w-[720px] mt-[32px] mx-auto flex flex-col items-center justify-center py-[40px] md:py-0"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="form-inp w-4/5 ">
                <label
                  htmlFor="name"
                  className="font-[400] text-[20px]  md:text-[24px]"
                >
                  Category
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Award Category"
                  name="category"
                  value={state.category}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp mt-[24px] w-4/5">
                <textarea
                  name="description"
                  id="message"
                  className="w-full  h-[150px] md:h-[267px] pl-[24px] pt-[32px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Award Categories Description"
                  value={state.description}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={1500}
                ></textarea>
              </div>
              <div className="w-4/5 md:w-[560px] md:mt-[40px] mx-auto md:mx-0">
                <button
                  onClick={() => setBtnText(!btnText)}
                  type="submit"
                  className="h-[56px] font-[600] text-[20px] md:text-[24px] text-black w-full bg-primary hover:bg-primary mt-[36px] rounded-full"
                >
                  {btnText ? "Creating..." : "Create Category"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Animation>
  );
};

export default CreateCategories;
