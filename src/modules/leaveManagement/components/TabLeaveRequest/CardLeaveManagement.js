import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalUpdate from "../../../common/ModalUpdate";
import { responseLeaveRequest } from "../../actions";
import FormLeaveManagement from "./FormLeaveManagement";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { getLeaveManagementInformation } from "../../actions";
import { headers } from "./headers";
import { Grid } from "@mui/material";
import { getAccountInformation } from "../../../identity/actions";
import moment from "moment";
const useStyles = makeStyles(() => ({
  ButtonAdd: {
    display: "flex",
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
  searchBox: {
    height: "59px",
  },
}));

const CardLeaveManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leaveManagementInformation } = useSelector(
    (state) => state.leaveManagementReducer
  );
  const { accountInformation } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    dispatch(getAccountInformation());
    dispatch(getLeaveManagementInformation());
  }, []);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [columnData, setColumnData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  let Header = headers;
  let Info = [];

  Header[headers.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    width: "185",
    headerClassName: "bg-light-green",
    renderCell: (cellValues) => {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {}
          <Button
            variant="outlined"
            color="success"
            style={{ border: "none", marginRight: "10px" }}
            size="small"
            onClick={(event) => {
              handleClickResponse(event, cellValues, false);
            }}
            disabled={
              cellValues.row.accRole === "Management" ||
              cellValues.row.accRole === "Manager"
                ? cellValues.row.Leave_status !== "Requested"
                  ? true
                  : false
                : cellValues.row.accRole === "Approver"
                ? cellValues.row.Leave_status === "Approved cancellation" ||
                  cellValues.row.Leave_status.split(" ")[0] === "Declined"
                  ? true
                  : false
                : false
            }
          >
            Decline
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#8bc34a" }}
            onClick={(event) => {
              handleClickResponse(event, cellValues, true);
            }}
            disabled={
              cellValues.row.accRole === "Management" ||
              cellValues.row.accRole === "Manager"
                ? cellValues.row.Leave_status !== "Requested"
                  ? true
                  : false
                : cellValues.row.accRole === "Approver"
                ? /Request/.test(cellValues.row.Leave_status) ||
                  cellValues.row.Leave_status === "Approved by chief"
                  ? false
                  : true
                : false
            }
          >
            Approve
          </Button>
        </div>
      );
    },
  };

  const handleClose = () => {
    setOpen(false);
    setStatus("");
    setColumnData({});
  };

  const handleClickResponse = (event, cellValues, status) => {
    setColumnData(cellValues);
    setOpen(true);
    setStatus(status);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setDataGrid = () => {
    if (
      Object.keys(leaveManagementInformation).length !== 0 &&
      Object.keys(accountInformation).length !== 0
    ) {
      leaveManagementInformation.data.map((item, index) => {
        let timeDiff = moment.duration(moment(item.End).diff(item.Begin));
        let hours = Math.floor(timeDiff.asSeconds() / 3600);
        let min = Math.floor((timeDiff.asSeconds() - hours * 3600) / 60);
        Info.push(item);
        if (item.Detail === "null") {
          Info[index].Detail = "-";
        }
        Info[index].id = item.Request_id;
        Info[index].accRole = accountInformation.Role;

        // Info[index].Amount = getLeaveAmount(hours, min);
      });
      Info.reverse();
    }
  };
  setDataGrid();
  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Approve Request"
      >
        <FormLeaveManagement
          handleClose={handleClose}
          columnData={columnData}
          status={status}
        />
      </ModalUpdate>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6}>
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Grid>
        <Grid item xs={12} style={{ width: "100%" }}>
          <DataGrid
            sortingOrder={["desc", "asc"]}
            sortModel={sortModel}
            onSortModelChange={(model) =>
              Info.length !== 0 ? setSortModel(model) : ""
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 50, 100]}
            pagination
            disableSelectionOnClick
            className={classes.datagrid}
            headers={Header ? Header : ""}
            rows={searchText ? searchInfo : Info ? Info : ""}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CardLeaveManagement;
