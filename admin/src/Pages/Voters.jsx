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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 20 },
  {
    field: "nomName",
    headerName: "Nominee's Name",
    width: 200,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 210,
    editable: true,
  },
  {
    field: "subcategory",
    headerName: "Subcategory",
    width: 260,
    editable: true,
  },
  {
    field: "contactPhoneNumber",
    headerName: "Nominee's Phone Number",
    width: 200,
    editable: true,
  },
  {
    field: "votes",
    headerName: "Number of vote",
    width: 100,
    editable: true,
  },
];

export default function Voters() {
  const [info, setInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { darkToggle } = useStateContext();
  const fetchData = async () => {
    const response = await fetch(`${url}/vote/candidates`);
    const data = await response.json();
    setInfo(data);
  };
  let totalVotes = info.map((vote) => vote.votes);
  totalVotes = totalVotes.reduce((partialSum, a) => partialSum + a, 0);

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  return (
    <div className="dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white h-screen pt-[80px] md:pt-[25px]">
      <Animation>
        <Box className="h-[700px] w-[95%] md:w-[95%] mt-[45px] mx-auto md:mt-[25px] bg-white rounded dark:bg-main-dark-bg dark:border-none">
          <DataGrid
            rows={info}
            getRowId={(info) => info._id}
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
