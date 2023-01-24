import React, { useState, useEffect } from "react";
import { url } from "../url";
import Animation from "../components/Animation";
import uploadcare from "uploadcare-widget";

const INTITAL_STATE = {
  name: "",
  country: "",
  // image: "",
  twitter: "",
  linkedIn: "",
  facebook: "",
  bio: "",
};
const SetEventSpeakers = () => {
  const [btnText, setBtnText] = useState(false);
  const [image, setImage] = useState("");
  const [state, setState] = useState([
    {
      name: "",
      country: "",
      // image: "",
      twitter: "",
      linkedIn: "",
      facebook: "",
      bio: "",
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
  // let widget;
  React.useEffect(() => {
    // widget = uploadcare.Widget("#uploader", {
    //   publicKey: "3f38fe2d4402e02dcef4",
    // });

    // get a widget reference
    const widget = uploadcare.Widget("[role=uploadcare-uploader]");

    // listen to the "upload completed" event
    widget.onUploadComplete((fileInfo) => {
      // get a CDN URL from the file info
      console.log(fileInfo);
      setImage(fileInfo.cdnUrl);
    });
  });
  // const widget = uploadcare.Widget("#uploader", {
  //   publicKey: "3f38fe2d4402e02dcef4",
  // });
  // let widget;
  const handleSubmit = (e) => {
    e.preventDefault();

    let createSpeaker = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", `Bearer ${auth.token}`);
      // myHeaders.append("Authorization", `Bearer rnd_cR8FjAwOCy9lBAQjeMzH8I4WN4xI`);
      let response = await fetch(`${url}/speakers`, {
        method: "post",
        headers: myHeaders,
        body: JSON.stringify({
          name: state.name,
          country: state.country,
          twitter: state.twitter,
          facebook: state.facebook,
          linkedin: state.linkedIn,
          bio: state.bio,
          profileUrl: image,
        }),
      });
      let data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error.message);
        setBtnText(false);
      } else {
        alert("Speaker Added Successfull");
        setBtnText(false);
      }
      setState("");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    };
    createSpeaker();
    // window.location.reload();
  };

  return (
    <Animation>
      <div className="dark:bg-main-dark-bg dark:text-white">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[1041px]  pt-[80px] md:pt-[56px]  ">
            <div className="pl-[20px] w-5/6 md:pl-[161px] mx-auto md:mx-0">
              <h1 className="font-[600] text-[24px] ">Create Event Speakers</h1>
            </div>
            <div
              className="w-5/6 md:w-[720px] mt-[32px] mx-auto flex flex-col items-center justify-center py-[40px] md:py-0"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="form-inp w-4/5 ">
                <label
                  htmlFor="name"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  Speaker's Name
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
                  placeholder="Speakers Name"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp w-4/5 mt-7">
                <label
                  htmlFor="country"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  Speaker's Country
                </label>
                <input
                  required
                  type="text"
                  id="country"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Speakers Country"
                  name="country"
                  value={state.country}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp w-4/5 mt-7">
                <label
                  htmlFor="twitter"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  Twitter URL
                </label>
                <input
                  type="url"
                  id="twitter"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Speakers Twitter URL"
                  name="twitter"
                  value={state.twitter}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp w-4/5 mt-7">
                <label
                  htmlFor="facebook"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  Facebook URL
                </label>
                <input
                  type="url"
                  id="facebook"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Speakers Facebook URL"
                  name="facebook"
                  value={state.facebook}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp w-4/5 mt-7">
                <label
                  htmlFor="linkedIn"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  LinkedIn URL
                </label>
                <input
                  required
                  type="url"
                  id="linkedIn"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Speakers LinkedIn URL"
                  name="linkedIn"
                  value={state.linkedIn}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp w-4/5 mt-7">
                <label
                  htmlFor="image"
                  className="font-[400] text-[18px]  md:text-[20px] block mb-4"
                >
                  Upload Speaker's Image
                </label>
                <input
                  type="hidden"
                  role="uploadcare-uploader"
                  data-public-key="3f38fe2d4402e02dcef4"
                  data-tabs="file camera url facebook gdrive gphotos dropbox"
                  data-effects="crop"
                  className="upload"
                  style={{ backgroundColor: "red!important" }}
                />
              </div>
              <div className="form-inp mt-[24px] w-4/5">
                <label
                  htmlFor="bio"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  Speaker's bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  required
                  className="w-full  h-[150px] md:h-[267px] pl-[24px] pt-[32px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  placeholder="Speaker's bio"
                  value={state.bio}
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

export default SetEventSpeakers;
