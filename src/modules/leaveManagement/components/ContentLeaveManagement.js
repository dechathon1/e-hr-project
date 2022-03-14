import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import CardLeaveManagement from "./TabLeaveRequest/CardLeaveManagement";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardLeaveInformation from "./TabLeaveInformation/CardLeaveInformation";
const useStyles = makeStyles(() => ({
  Topic: {
    marginBottom: "10px",
  },
  box: {
    padding: "40px ",
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
    "&.css-13xfq8m-MuiTabPanel-root": {
      padding: "0px",
    },
  },
}));

const ContentLeaveManagement = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3" color="pink" fontWeight="medium">
        Leave Management
      </Typography>

      <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} className={classes.tablist}>
              <Tab
                label="Leave Request"
                value="1"
                className={classes.tabitem}
              />
              <Tab
                label="Leave Information"
                value="2"
                className={classes.tabitem}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className={classes.tabpanel}>
            <CardLeaveManagement />
          </TabPanel>
          <TabPanel value="2" className={classes.tabpanel}>
              <CardLeaveInformation/>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ContentLeaveManagement;
