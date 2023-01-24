import React, { useState } from "react";
import Animation from "../components/Animation";
import { url } from "../url";

const SetEventInfo = () => {
  const [btnText, setBtnText] = useState("");
  const [nomDate, setNomDate] = useState("");
  const [votingDate, setVotingDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [state, setState] = useState([
    {
      nomStartDate: "",
      nomEndDate: "",
      votingStartDate: "",
      votingEndDate: "",
      eventDate: "",
      venue: "",
    },
  ]);
  const handleChange = (evt) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    const fetchNomDate = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch(`${url}/info/nomDate`, {
        method: "post",
        headers: myHeaders,
        body: JSON.stringify({
          startDate: state.nomStartDate,
          endDate: state.nomEndDate,
        }),
      });
      let data = await response.json();
      console.log(data);
      setState("");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    };
    //   End FetchNomDate
    const fetchEventDate = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch(`${url}/info/eventDate`, {
        method: "post",
        headers: myHeaders,
        body: JSON.stringify({
          eventDate: state.eventDate,
        }),
      });
      let data = await response.json();
      // console.log(data);
      setState("");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    };
    const fetchVotingDate = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch(`${url}/info/votingDate`, {
        method: "post",
        headers: myHeaders,
        body: JSON.stringify({
          startDate: state.votingStartDate,
          endDate: state.votingEndDate,
        }),
      });
      let data = await response.json();
      console.log(data);
      setState("");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    };
    const fetchEventVenue = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch(`${url}/info/eventVenue`, {
        method: "post",
        headers: myHeaders,
        body: JSON.stringify({
          venue: state.venue,
        }),
      });
      let data = await response.json();
      // console.log(data);
      setState("");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    };
    fetchNomDate();
    fetchVotingDate();
    fetchEventDate();
    fetchEventVenue();
    setBtnText(false);
  };
  console.log(state);
  return (
    <Animation>
      <div className="dark:bg-main-dark-bg dark:text-white">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[1041px]  py-[80px] md:pt-[56px]  ">
            <div className="pl-[20px] w-5/6 md:pl-[161px] mx-auto md:mx-0">
              <h1 className="font-[600] text-[24px] ">
                create Event Information
              </h1>
            </div>
            <div
              className="w-5/6 md:w-[720px] mt-[32px] mx-auto flex flex-col items-center justify-center py-[40px] md:py-0"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="form-inp mt-[15px] w-4/5 ">
                <label
                  htmlFor="nomStartDate"
                  className="ml-[12px] font-[600] text-[18px] leading-6"
                >
                  Nomination Start Date
                </label>
                <input
                  type="date"
                  id="nomStartDate"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  name="nomStartDate"
                  value={state.nomStartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp mt-[15px] w-4/5 ">
                <label
                  htmlFor="nomEndDate"
                  className="ml-[12px] font-[600] text-[18px] leading-6"
                >
                  Nomination End Date
                </label>
                <input
                  type="date"
                  id="nomEndDate"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  name="nomEndDate"
                  value={state.nomEndDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp mt-[15px] w-4/5 ">
                <label
                  htmlFor="votingStartDate"
                  className="ml-[12px] font-[600] text-[18px] leading-6"
                >
                  Voting Start Date
                </label>
                <input
                  type="date"
                  id="votingStartDate"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  name="votingStartDate"
                  value={state.votingStartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp mt-[15px] w-4/5 ">
                <label
                  htmlFor="votingEnddate"
                  className="ml-[12px] font-[600] text-[18px] leading-6"
                >
                  Voting End Date
                </label>
                <input
                  type="date"
                  id="votingEndDate"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  name="votingEndDate"
                  value={state.votingEndDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp mt-[15px] w-4/5 ">
                <label
                  htmlFor="eventDate"
                  className="ml-[12px] font-[600] text-[18px] leading-6"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  name="eventDate"
                  value={state.eventDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-inp mt-[15px] w-4/5 ">
                <label
                  htmlFor="venue"
                  className="ml-[12px] font-[600] text-[18px] leading-6"
                >
                  Event Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px]"
                  placeholder="Event Venue"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  name="venue"
                  value={state.venue}
                  onChange={handleChange}
                />
              </div>
              <div className="w-4/5 md:w-[560px] md:my-[40px] mx-auto md:mx-0">
                <button
                  onClick={() => setBtnText(!btnText)}
                  type="submit"
                  className="h-[56px] font-[600] text-[20px] md:text-[24px] text-black w-full bg-primary hover:bg-primary mt-[36px] rounded-full"
                >
                  {btnText ? "Creating..." : "Create Event Info"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Animation>
  );
};

export default SetEventInfo;
