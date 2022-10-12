import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dateFormat, { masks } from "dateformat";
import { useStateContext } from "../context/AuthContext";

let num = 0;
function Nominees() {
  const { darkToggle } = useStateContext();
  const [info, setInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "name",
      headerName: "Nominator's Name",
      width: 200,
      editable: true,
    },
    {
      field: "category",
      headerName: "Voted Category",
      width: 120,
      editable: true,
    },
    {
      field: "nomName",
      headerName: "Nominee's Name",
      width: 200,
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
      headerName: "Date Nominated",
      width: 200,
      editable: true,
    },
  ];
  const fetchData = async () => {
    const response = await fetch(
      `https://adca-api.onrender.com/api/nominations/`
    );
    const data = await response.json();
    setInfo(data);
    console.log(info);
  };
  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const fetchPersonalInfo = async (event) => {
    // console.log(event.id);
    const response = await fetch(
      `https://adca-api.onrender.com/api/nominations/id/${event.id}`
    );
    const data = await response.json();
    setUserInfo(data);
    console.log(data);
  };
  // useEffect(
  //   (event) => {

  //     // return () => {
  //     //   fetchPersonalInfo();
  //     // };
  //   },
  //   [userId]);

  let items = info.map(({ _id, personalInfo, nominationInfo }) => {
    const date = info.createdAt;
    return {
      id: num,
      userId: _id,
      name: personalInfo.name,
      category: nominationInfo.category,
      nomName: nominationInfo.nomName,
      contactEmail: nominationInfo.contactEmail,
      createdAt: dateFormat(date, "fullDate"),
    };
  });
  // console.log(items);
  return (
    <div className="block md:flex gap-5 dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white">
      <Box className="h-[500px] w-[95%] md:w-[70%] mt-[45px] md:mt-[25px] bg-white rounded ml-3 dark:bg-main-dark-bg dark:border-none">
        <DataGrid
          rows={items}
          columns={columns}
          getRowId={(items) => items.userId}
          pageSize={7}
          rowsPerPageOptions={[7]}
          // checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
          onRowClick={fetchPersonalInfo}
          sx={{
            borderColor: `${darkToggle && "grey.500"}`,
            color: `${darkToggle && "white"}`,
          }}
        />
      </Box>
      <div className="mt-[18px] md:mt-0 bg-white rounded h-[100vh] md:w-[28%] mr-3 md:overflow-hidden overflow-auto md:hover:overflow-auto dark:bg-main-dark-bg">
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
            <h3 className="font-[600] mt-[15px] capitalize"> contact Email</h3>
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
          <div className="flex items-center justify-center p-[15px]">
            <p>Please Select a Row to see full details</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Nominees;
