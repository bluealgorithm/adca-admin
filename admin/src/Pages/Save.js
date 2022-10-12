import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Nominees = () => {
  return (
    <Box
      sx={{
        height: 400,
        width: `100%`,
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage User
      </Typography>

      {/* <DataGrid column={2} rows={2} /> */}
    </Box>
  );
};

export default Nominees;
