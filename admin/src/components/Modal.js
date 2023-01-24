import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Modal, Fade, Button, Typography } from "@mui/material/";
import { url } from "../url";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",
  height: "90vh",
  p: 4,
};

export default function TransitionModal({ modalOpen, user }) {
  const [open, setOpen] = React.useState(false);
  const [subcategories, setSubCategories] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (modalOpen === true) {
      handleOpen();
    }
  }, [modalOpen]);

  const fetchSubCategories = async () => {
    const response = await fetch(`${url}/subcategories`);
    const data = await response.json();
    setSubCategories(data);
  };
  fetchSubCategories();

  // console.log(selectedCat, selectedSubCat);
  // const handleChange = (e) => {
  //   setSelectedCat(e.target.value);
  // };

  const handleEdit = (e) => {
    // e.preventDefault();
    const updateNomination = async () => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let response = await fetch(`${url}/nominations/edit/${user._id}`, {
        method: "put",
        headers: myHeaders,
        body: JSON.stringify({
          category: selectedCat,
          subcategory: selectedSubCat,
        }),
      });
      const data = await response.json();
      console.log(data);
      // setMessage(data);
      if (data.message === "Updated successfully") {
        console.log(data.message);
        // handleAlert();
      } else {
        console.log(data.message);
        // handleErrorAlert();
      }
    };
    updateNomination();
  };
  // console.log(user);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-5/6 md:w-[720px] mt-[32px] mx-auto flex flex-col items-center h-4/5 ">
              <form onSubmit={handleEdit}>
                <label
                  htmlFor="cat"
                  className="font-[400] text-[18px]  md:text-[20px]"
                >
                  Select Category
                </label>
                <select
                  name="categories"
                  id="cat"
                  className="w-full h-[56px] border-none mt-[8px] p-[16px] pr-[12px] mb-[30px]"
                  style={{
                    background: "#FFFFFF",
                    boxShadow: " 4px 4px 8px rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  <option value="">-- Select category --</option>
                  {subcategories &&
                    subcategories.map((category) => (
                      <option value={category.category}>
                        {category.category}
                      </option>
                    ))}
                </select>
                <label
                  htmlFor="sub"
                  className="font-[400] text-[18px]  md:text-[20px] mt-[20px]"
                >
                  Select Subcategory
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
                  onChange={(e) => setSelectedSubCat(e.target.value)}
                >
                  <option value="">-- Select Subcategory --</option>
                  {subcategories &&
                    subcategories.map((category) => (
                      <option value={category.subcategory}>
                        {category.subcategory}
                      </option>
                    ))}
                </select>
                <div className="w-4/5 md:w-[332px] mx-auto ">
                  <button
                    type="submit"
                    className="h-[56px] font-[600] text-[20px] md:text-[24px] text-black w-full bg-primary hover:bg-primary mt-[36px] rounded-full"
                  >
                    Change Info
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
