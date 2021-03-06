import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import CardCheckIn_CheckOut from "./CardCheckIn_CheckOut";
const useStyles = makeStyles((theme) => ({
  Topic: {
    marginBottom: "10px",
  },
  box: {
    padding: "40px 40px 0 40px ",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 20px  0 20px ",
    },
  },
  tabitem: {
    marginRight: "30px !important",
    padding: "0 !important",
    minWidth: "150px !important",
    textTransform: "none !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
    "&:hover": {
      color: "#C91F92 !important",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#C91F92 !important",
    },
  },
  tablist: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#C91F92 !important",
    },
  },
  tabpanel: {
    padding: " 16px 0 !important",
  },
  headerTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px ",
    },
  },
}));

const ContentCheckIn_CheckOut = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="h3" color="pink" fontWeight="medium" className={classes.headerTitle}>
        Time Attendance
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
        <CardCheckIn_CheckOut />
      </Box>
    </Box>
  );
};

export default ContentCheckIn_CheckOut;
