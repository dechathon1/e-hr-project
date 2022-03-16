import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import CardTimeSheetRecord from "./CardTimeSheetRecord";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
const useStyles = makeStyles(() => ({
  margintop: {
    marginTop: "40px",
  },
  padding: {
    padding: "24px",
  },
  box: {
    padding: "40px ",
  },
}));

const ContentTimeSheetRecord = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="h3" color="pink" fontWeight="medium">
        Time Sheet Record
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "15px" }}>
      <Divider/>
        <CardTimeSheetRecord />
      </Box>
    </Box>
  );
};

export default ContentTimeSheetRecord;
