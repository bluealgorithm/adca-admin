import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dateFormat, { masks } from "dateformat";
import { useStateContext } from "../context/AuthContext";
import Animation from "../components/Animation";

let num = 0;
function Categories() {
  const { darkToggle } = useStateContext();
  const [info, setInfo] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "category",
      headerName: "Type of Nominee",
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
 

  // const fetchCategories = async () => {
  //   const response = await fetch(
  //     `https://adca-api.onrender.com/api/categories`
  //   );
  //   const data = await response.json();
  //   setInfo(data);
  //   console.log(data);
  // };

  // useEffect(() => {
  //       fetchCategories();
  //    return () => {
  //      fetchCategories()
  //   }
  // }, []);

  const fetchSubCategories = async () => {
    const response = await fetch(
      `https://adca-api.onrender.com/api/subcategories`
    );
    const data = await response.json();
    setSubCategories(data);
    console.log(data);
  };

  useEffect(() => {
        fetchSubCategories();
     return () => {
       fetchSubCategories()
    }
  }, []);

  return (
    <div className="h-screen dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white">
      <Animation>
      <Box className="h-[500px] w-[95%] md:w-[95%] pt-[45px] md:mp-[25px] bg-white rounded ml-3 dark:bg-main-dark-bg dark:border-none">
        <DataGrid
          rows={subCategories}
          columns={columns}
          getRowId={(subCategories) => subCategories._id}
          pageSize={7}
          rowsPerPageOptions={[7]}
          // checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
          // onRowClick={fetchPersonalInfo}
          sx={{
            borderColor: `${darkToggle && "grey.500"}`,
            color: `${darkToggle && "white"}`,
          }}
        />
        </Box>
        </Animation>
      </div>
  );
}
export default Categories;
