import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { allLeaveHeader } from "./allLeaveHeader";
import moment from "moment";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { getAllLeaveInformation } from "../../actions";
import { getLeaveInformationByID } from "../../../leaveRequest/actions";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import Typography from "../../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorIcon from "@mui/icons-material/Error";
import classNames from "classnames";
import { getLeaveTypeInformation } from "../../../leaveType/actions";
import { Divider } from "@mui/material";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";
const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: "20px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  ButtonAdd: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center !important",
    },
  },
  box: {
    marginTop: "20px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  checkButton: {
    width: "125px ",
  },
  attention: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  attention2: {
    [theme.breakpoints.up(900)]: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      marginLeft: "15px",
    },
    [theme.breakpoints.down(900)]: {
      display: "none",
    },
  },
  normal: {
    backgroundColor: "#8bc34a !important",
  },
  holiday: {
    backgroundColor: "#2196f3 !important",
  },
  daySearch: {
    width: "100% !important",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center !important",
    },
  },
  typeBT: {
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
  },
  datePicker: {
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
  },
  paddingTop: {
    paddingTop: "5px !important",
  },
  paddingTop2: {
    [theme.breakpoints.up(900)]: {
      paddingTop: "5px !important",
    },
  },
}));

const CardRestOfLeave = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { empInformation } = useSelector((state) => state.employeeReducer);
  const { allLeaveInformation } = useSelector((state) => state.reportReducer);
  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  const { leaveTypeInformation } = useSelector(
    (state) => state.leaveTypeReducer
  );
  const { leaveInformationByID } = useSelector((state) => state.leaveReducer);

  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(50);

  const [isBetween, setIsBetween] = useState(false);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);
  const [isSetInfo, setIsSetInfo] = useState(false);
  const [Info, setInfo] = useState([]);
  const [Header, setHeader] = useState([]);

  useEffect(() => {
    dispatch(getAllLeaveInformation());
    dispatch(getLeaveTypeInformation());
  }, []);
  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation, day]);
  useEffect(() => {
    if (Object.keys(leaveTypeInformation).length !== 0) setHeaderColumn();
    else dispatch(getLeaveTypeInformation());
  }, [leaveTypeInformation]);
  useEffect(() => {
    setDataGrid();
  }, [allLeaveInformation, day, showType]);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          if (field !== "Type_ID")
            return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setNextDate = () => {
    let tomorrow = moment(day).add(1, "days");
    setDay(new Date(tomorrow));
  };
  const setBeforeDate = () => {
    let yesterday = moment(day).add(-1, "days");
    setDay(new Date(yesterday));
  };
  const setToDay = () => {
    setDay(new Date(moment()));
  };
  const checkIsBetweenDate = () => {
    if (Object.keys(holidaysInformation).length !== 0) {
      const nowYear = moment(new Date()).format("YYYY");
      holidaysInformation.data.map((item) => {
        const start = new Date(
          moment(moment(item.Start).format("MMM Do ") + nowYear, "MMM Do YYYY")
        );
        const end = new Date(
          moment(
            moment(item.End).format("MMM Do ") + nowYear,
            "MMM Do YYYY"
          ).add(1, "days")
        );
        const now = day;
        const range = moment().range(start, end);
        if (range.contains(now)) {
          setIsBetween(true);
        } else {
          setIsBetween(false);
        }
      });
    }
  };
  const setHeaderColumn = () => {
    setHeader([]);
    setHeader((Info) => [
      ...Info,
      {
        field: "Name",
        headerName: "Name",
        minWidth: 200,
        headerClassName: "bg-light-green",
        renderCell: renderCellExpand,
        sortable: false,
      },
    ]);

    if (Object.keys(leaveTypeInformation).length !== 0) {
      leaveTypeInformation.data.map((item, index) => {
        setHeader((Info) => [
          ...Info,
          {
            field: item.Type_name,
            headerName: item.Type_name,
            minWidth: 80,
            flex: 1,
            headerClassName: "bg-light-green",
            renderCell: renderCellExpand,
            sortable: false,
          },
        ]);
      });
    }
  };
  const setDataGrid = () => {
    setInfo([]);
    setIsSetInfo(false);
    if (
      Object.keys(allLeaveInformation).length !== 0 &&
      Object.keys(empInformation).length !== 0 &&
      Object.keys(leaveTypeInformation).length !== 0
    ) {
      empInformation.data.map((emp) => {
        let temp = {};
        let count = {};
        temp.Name = emp.Name;
        temp.id = emp.Emp_id;
        leaveTypeInformation.data.map((type) => {
          temp[type.Type_name] = 0;
        });
        allLeaveInformation.data.map((item) => {
         
        });
        Object.keys(count).map(function (key) {
          temp[key] = count[key];
        });
        Object.keys(temp).map(function (key) {
          if (temp[key] === 0) temp[key] = "0";
        });
        setInfo((Info) => [...Info, temp]);
      });
      setIsSetInfo(true);
    }
  };

  // setDataGrid();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2}>
          <Grid item sm={12} style={{ width: "100%" }}>
            <QuickSearchToolbar
              value={searchText}
              onChange={(event) => requestSearch(event.target.value)}
              clearSearch={() => requestSearch("")}
            />
            <div style={{height:"5px"}}/>
            <DataGrid
              sortingOrder={["desc", "asc"]}
              sortModel={sortModel}
              onSortModelChange={(model) =>
                Info.length !== 0 ? setSortModel(model) : ""
              }
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[50, 100]}
              pagination
              loading={isSetInfo ? false : true}
              disableSelectionOnClick
              className={classes.datagrid}
              headers={Header ? Header : ""}
              rows={searchText ? searchInfo : Info ? Info : ""}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

export default CardRestOfLeave;
