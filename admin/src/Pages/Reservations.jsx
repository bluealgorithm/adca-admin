import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useStateContext } from "../context/AuthContext";
import Animation from "../components/Animation";
import { url } from "../url";
import Categories from "./Categories";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 20 },
  {
    field: "name",
    headerName: "Full Name",
    width: 200,
    editable: true,
  },
  {
    field: "number",
    headerName: "Phone Number",
    width: 180,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 260,
    editable: true,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount Paid (#)",
    width: 200,
    editable: true,
  },
];

export default function Reservations() {
  const [info, setInfo] = useState([]);
  const [bothEvent, setBoth] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { darkToggle } = useStateContext();
  let reserve = [];
  const [selectedCat, setSelectedCat] = useState("");
  // let organization_id = "1278268841113";
  // "NwgG3SBxwN31RtS932lLE2ahKQmFdXlRzVrz_BZzB5ene9qmGWkF8A==";
  // const api =
  // ("https://www.eventbriteapi.com/v3/users/me/?token=EW2CPPLUNVERR72VQVGA");
  // const url = 'https://www.eventbriteapi.com/v3/organizations/{organization_id}/events/ -H 'Authorization: Bearer PERSONAL_OAUTH_TOKEN''
  // const fetchEventBrite = async () => {
  //   // const response = await fetch(
  //   //   `https://www.eventbriteapi.com/v3/organizations/${organization_id}/events/?token=EW2CPPLUNVERR72VQVGA`
  //   // );
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   // myHeaders.append("Authorization", `Bearer ${auth.token}`);
  //   myHeaders.append("Authorization", `Bearer EW2CPPLUNVERR72VQVGA`);
  //   let response = await fetch(
  //     `https://www.eventbriteapi.com/v3/events/471130563197/attendees/`,
  //     {
  //       method: "get",
  //       // Authorization: "Bearer EW2CPPLUNVERR72VQVGA",
  //       headers: myHeaders,
  //       // body: JSON.stringify({
  //       //   category: state.category,
  //       //   subcategory: state.subcategory,
  //       // }),
  //     }
  //   );
  //   console.log(response.data);
  // };
  // useEffect(() => {
  //   fetchEventBrite();
  // }, []);

  const fetchData = async () => {
    const response = await fetch(`${url}/reservation/award-reservations`);
    const data = await response.json();
    setInfo(data);
    // console.log(data);
  };

  const fetchBoth = async () => {
    const response = await fetch(`${url}/reservation/both`);
    const data = await response.json();
    setInfo(data);
  };
  console.log(bothEvent, info);
  const handleChange = (e) => {
    setSelectedCat(e.target.value);
  };

  if (selectedCat === "both") {
    fetchBoth();
  } else if (selectedCat === "galaNight") {
    fetchData();
  }
  let items = info.map((data) => {
    // const date = info.createdAt;
    const { _id, personalInfo, organizationInfo, seatReservation } = data;
    let price = seatReservation.split("").slice(0, 4).join("");
    return {
      userId: data._id,
      name: personalInfo.fullName,
      number: personalInfo.phoneNumber,
      email: personalInfo.email,
      country: personalInfo.country,
      amount: price,
      //   createdAt: dateFormat(data.createdAt, "fullDate"),
    };
  });
  return (
    <div className="dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white h-screen pt-[80px] md:pt-[25px]">
      <Animation>
        <div className="w-5/6 md:w-[720px] mt-[32px] mx-auto">
          <label
            htmlFor="sub"
            className="font-[400] text-[18px]  md:text-[20px]"
          >
            Select Type of Reservation
          </label>
          <select
            name="subcategories"
            id="sub"
            className="w-full h-[56px] border-none mt-[8px] p-[16px] pr-[12px]"
            style={{
              background: "#FFFFFF",
              boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
              borderRadius: "8px",
            }}
            onChange={handleChange}
          >
            <option value="">-- Select Event --</option>
            <option value="both"> Both Event </option>
            <option value="galaNight"> Gala Night </option>
          </select>
        </div>
        {/* </div> */}
        <Box className="h-[700px] w-[95%] md:w-[95%] mt-[45px] mx-auto md:mt-[25px] bg-white rounded dark:bg-main-dark-bg dark:border-none">
          <DataGrid
            rows={items}
            getRowId={(items) => items.userId}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{
              borderColor: `${darkToggle && "grey.500"}`,
              color: `${darkToggle && "white"}`,
            }}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Animation>
    </div>
  );
}
