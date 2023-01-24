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
// import Swal from "sweetalert2";
import Modal from "../components/Modal";
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
function Nominees() {
  const { darkToggle, activeMenu, setActiveMenu } = useStateContext();
  const [info, setInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [btnText, setBtnText] = useState(false);
  const [userId, setUserId] = useState(null);
  const [approve, setApprove] = useState("");
  const [open, setOpen] = useState(false);
  // let open = false;
  // const MySwal = withReactContent(Swal);
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
      width: 220,
      editable: true,
    },
    {
      field: "subcategory",
      headerName: "Voted Subcategory",
      width: 220,
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
    const response = await fetch(`${url}/nominations`);
    const data = await response.json();
    setInfo(data);
    // console.log(info);
  };
  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const fetchPersonalInfo = async (event) => {
    // alert(event.id);
    const response = await fetch(`${url}/nominations/id/${event.id}`);
    const data = await response.json();
    setUserInfo(data);
    setOpen(true);
    // open = true;
    setUserId(event.id);
  };

  const approveNomination = async (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let response = await fetch(`${url}/nominations/${id}`, {
      method: "put",
      headers: myHeaders,
      body: JSON.stringify({
        _id: id,
      }),
    });
    const data = await response.json();
    setApprove(data);
    if ((data.message = "Nomination approved successfully" && userId === id))
      setBtnText(true);
    // console.log(data);
    window.location.reload();
  };

  let items = info.map((data) => {
    const date = info.createdAt;
    const { _id, personalInfo, nominationInfo } = data;
    return {
      id: num,
      userId: _id,
      name: personalInfo.name,
      category: nominationInfo.category,
      subcategory: nominationInfo.subcategory,
      nomName: nominationInfo.nomName,
      contactEmail: nominationInfo.contactEmail,
      createdAt: dateFormat(data.createdAt, "fullDate"),
    };
  });
  const handleEdit = (
    params, // GridCellEditCommitParams
    event, // MuiEvent<MuiBaseEvent>
    details
  ) => {
    const updateNomination = async () => {
      console.log(params.row.category);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch(`${url}/nominations/${params.row.userId}`, {
        method: "patch",
        headers: myHeaders,
        body: JSON.stringify({
          category: params.row.category,
          subcategory: params.row.category,
        }),
      });
      const data = await response.json();
      setUserInfo(data);
      setOpen(true);
      setUserId(params.row.userId);
      if (data.message === "Vote successful") {
        console.log(data.message);
        // handleAlert();
      } else {
        console.log(data.message);
        // handleErrorAlert();
      }
    };
    updateNomination();
  };
  return (
    <Animation>
      <Modal modalOpen={open} user={userInfo} />
      {/* <div className="block md:flex gap-5 dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white"> */}
      <Box className="h-[700px] w-[95%] md:w-[95%] mt-[45px] md:mt-[25px] bg-white rounded ml-3 dark:bg-main-dark-bg dark:border-none">
        <DataGrid
          rows={items}
          columns={columns}
          getRowId={(items) => items.userId}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          editMode="row"
          experimentalFeatures={{ newEditingApi: true }}
          // onCellEditCommit={handleEdit}
          onRowClick={fetchPersonalInfo}
          // onRowClick={handleEdit}
          sx={{
            borderColor: `${darkToggle && "grey.500"}`,
            color: `${darkToggle && "white"}`,
          }}
          // loading={loading}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* </div> */}
    </Animation>
  );
}
export default Nominees;
