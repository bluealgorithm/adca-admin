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
  const [subcategories, setSubCategories] = useState([]);
  // const [vote, setVote] = useState([]);
  let vote = [];
  const [selectedCat, setSelectedCat] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { darkToggle } = useStateContext();

  const fetchData = async () => {
    const response = await fetch(`${url}/vote/candidates`);
    const data = await response.json();
    setInfo(data);
  };
  let totalVotes = info.map((vote) => vote.votes);
  totalVotes = totalVotes.reduce((partialSum, a) => partialSum + a, 0);
  fetchData();
  // useEffect(() => {
  //   if (selectedCat) fetchData();
  //   return () => {
  //     fetchData();
  //   };
  // }, []);

  const fetchSubCategories = async () => {
    const response = await fetch(`${url}/subcategories`);
    const data = await response.json();
    setSubCategories(data);
  };
  fetchSubCategories();
  // useEffect(() => {
  //   if (selectedCat) fetchSubCategories();
  //   // fetchSubCategories();
  //   return () => {
  //     fetchSubCategories();
  //   };
  // }, []);
  info.map(
    (i) => {
      if (i.subcategory === selectedCat) {
        vote.push(i);
      }
    },
    [info]
  );
  // console.log(subcategories);
  const handleChange = (e) => {
    // console.log(e.target.value);
    setSelectedCat(e.target.value);
  };
  // console.log(selectedCat);
  return (
    <div className="dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white h-screen pt-[80px] md:pt-[25px]">
      <Animation>
        <div className="w-5/6 md:w-[720px] mt-[32px] mx-auto">
          <label
            htmlFor="sub"
            className="font-[400] text-[18px]  md:text-[20px]"
          >
            Check Votes by Award
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
            <option value="">-- Select Subcategory --</option>
            {subcategories &&
              subcategories.map((category) => (
                <option value={category.subcategory}>
                  {category.subcategory}
                </option>
              ))}
          </select>
        </div>
        {/* </div> */}
        <Box className="h-[700px] w-[95%] md:w-[95%] mt-[45px] mx-auto md:mt-[25px] bg-white rounded dark:bg-main-dark-bg dark:border-none">
          <DataGrid
            rows={vote}
            getRowId={(vote) => vote._id}
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
