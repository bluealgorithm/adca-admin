import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { AiOutlineMenu } from "react-icons/ai";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dateFormat, { masks } from "dateformat";
import { useStateContext } from "../context/AuthContext";
import Animation from "../components/Animation";
import { url } from "../url";

let num = 0;
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ backgroundColor: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);
function Candidates() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { darkToggle, activeMenu, setActiveMenu } = useStateContext();
  const [info, setInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [btnText, setBtnText] = useState(false);
  const [show, setShow] = useState(false);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      editable: true,
    },
    {
      field: "subcategory",
      headerName: "Subcategory",
      width: 220,
      editable: true,
    },
    {
      field: "nomName",
      headerName: "Nominee's Name",
      width: 220,
      editable: true,
    },
    {
      field: "contactEmail",
      headerName: "Nominee's Email",
      width: 180,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Date Approved",
      width: 200,
      editable: true,
    },
  ];
  const fetchData = async () => {
    const response = await fetch(`${url}/vote/candidates`);
    const data = await response.json();
    setInfo(data);
  };
  console.log(info);
  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const fetchPersonalInfo = async (event) => {
    // console.log(event.id);
    const response = await fetch(`${url}/nominations/id/${event.id}`);
    const data = await response.json();
    setUserInfo(data);
    // setShow(true)
  };
  // let items = [];
  // if (info.length >= 1) {
  // let items = info.map(({ _id, personalInfo, nominationInfo }) => {
  //   const date = info.createdAt;
  //   return {
  //     id: num,
  //     userId: _id,
  //     name: personalInfo.name,
  //     category: nominationInfo.category,
  //     nomName: nominationInfo.nomName,
  //     contactEmail: nominationInfo.contactEmail,
  //     createdAt: dateFormat(date, "fullDate"),
  //   };
  // });

  // console.log(items);
  // for (let i = 0; i < items.length; i++) {
  //   return (num = i);
  // }
  // console.log(items);
  return (
    <Animation>
      <div className="block md:flex gap-5 dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white">
        <Box className="h-[700px] w-[95%] md:w-[70%] mt-[45px] md:mt-[25px] bg-white rounded ml-3 dark:bg-main-dark-bg dark:border-none">
          <DataGrid
            rows={info}
            columns={columns}
            getRowId={(info) => info._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            experimentalFeatures={{ newEditingApi: true }}
            onRowClick={fetchPersonalInfo}
            sx={{
              borderColor: `${darkToggle && "grey.500"}`,
              color: `${darkToggle && "white"}`,
            }}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
        <div
          className={`mt-[18px] md:mt-0 bg-white rounded h-[100vh] md:w-[28%] mr-3 md:overflow-hidden overflow-auto md:hover:overflow-auto dark:bg-main-dark-bg`}
        >
          {userInfo ? (
            // const {nominationInfo, personalInfo} = userInfo
            <div className="mx-[12px]">
              <h3 className="font-[600] text-[20px] mt-[25px] text-center">
                Nominators
              </h3>
              <h3 className="font-[600] mt-[15px]">Name</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.personalInfo.name}
              </p>
              <h3 className="font-[600] mt-[15px]">Address</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.personalInfo.address}
              </p>
              <h3 className="font-[600] mt-[15px]">Phone Number</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.personalInfo.phoneNumber}
              </p>
              <h3 className="font-[600] mt-[15px]">Nominator's email</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.personalInfo.emailAddress}
              </p>
              <h3 className="font-[600] text-[20px] mt-[25px] text-center">
                Nominees
              </h3>
              <h3 className="font-[600] mt-[15px]"> Name</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.nomName}
              </p>
              <h3 className="font-[600] mt-[15px]"> Type</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.nomineeType}
              </p>
              <h3 className="font-[600] mt-[15px]"> contact Person</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.contactPerson}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize"> Phone Number</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.contactPhoneNumber}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize"> job Title</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.jobTitle}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize">
                {" "}
                contact Email
              </h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.contactEmail}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize">
                {" "}
                company Address
              </h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.companyAddress}
              </p>

              <h3 className="font-[600] mt-[15px] capitalize">
                {" "}
                company Website Url
              </h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.companyWebsiteUrl}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize"> city</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.city}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize"> country</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.country}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize"> category</h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.category}
              </p>
              <h3 className="font-[600] mt-[15px] capitalize">
                {" "}
                milestoneAchieved
              </h3>
              <p className="font-[600] text-gray-300 text-[14px]">
                {userInfo.nominationInfo.milestoneAchieved}
              </p>
            </div>
          ) : (
            <div className="hidden h-screen md:flex items-center justify-center p-[15px]">
              <p className="font-[600] text-[20px] text-center">
                Select a Row to view the full details of the candidate
              </p>
            </div>
          )}
        </div>
      </div>
    </Animation>
  );
}
export default Candidates;