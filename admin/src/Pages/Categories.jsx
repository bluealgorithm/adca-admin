import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dateFormat, { masks } from "dateformat";
import { useStateContext } from "../context/AuthContext";
import Animation from "../components/Animation";
import { url } from "../url";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

let num = 0;
function Categories() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { darkToggle } = useStateContext();
  const [info, setInfo] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "category",
      headerName: "Categories",
      width: 320,
      editable: true,
    },
    {
      field: "subcategory",
      headerName: "Subcategories",
      width: 320,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Date Nominated",
      width: 320,
      editable: true,
    },
  ];

  const fetchSubCategories = async () => {
    const response = await fetch(`${url}/subcategories`);
    const data = await response.json();
    setSubCategories(data);
  };

  useEffect(() => {
    fetchSubCategories();
    return () => {
      fetchSubCategories();
    };
  }, []);

  return (
    <div className="h-screen pt-[50px] md:pt-[10px] dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white">
      <Animation>
        <Box className="h-[700px] w-[95%] md:w-[95%] pt-[45px] md:mb-[25px] bg-white rounded ml-3 dark:bg-main-dark-bg dark:border-none">
          <DataGrid
            rows={subCategories}
            columns={columns}
            getRowId={(subCategories) => subCategories._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            experimentalFeatures={{ newEditingApi: true }}
            // onRowClick={fetchPersonalInfo}
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
export default Categories;
