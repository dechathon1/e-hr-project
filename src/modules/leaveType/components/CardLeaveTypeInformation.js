import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import FormLeaveTypeUpdate from "./FormLeaveTypeUpdate";
import { Grid } from "@mui/material";

import DataGrid from "../../common/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getLeaveTypeInformation } from "../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalUpdate from "../../common/ModalUpdate";
import { deleteLeaveType } from "../actions";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { headers } from "./headers";
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
  searchBox:{
    height:"59px",
  },
}));

const CardLeaveTypeInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leaveTypeInformation } = useSelector(
    (state) => state.leaveTypeReducer
  );

  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [deleteID, setDeleteID] = useState("");

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
    headerClassName: "bg-light-green",
    headerName: "Action",
    width: 90,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="edit"
        onClick={onClickUpdate(params.id)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  };

  useEffect(() => {
    dispatch(getLeaveTypeInformation());
  }, []);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteLeaveType([String(id)]);
        dispatch(getLeaveTypeInformation());
      };
      onDelete(deleteID);
      setDeleteID("");
    }
  }, [deleteID]);

  const handleClose = () => {
    setOpen(false);
  };

  const onClickUpdate = React.useCallback(
    (id) => () => {
      setOpen(true);
      setOption("update");
      setID(id);
    },
    []
  );

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
    },
    []
  );

  const onClickAdd = () => {
    setOpen(true);
    setOption("add");
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
    if (Object.keys(leaveTypeInformation).length !== 0) {
      leaveTypeInformation.data.map((item, index) => {
        if (item.Type_name !== "DayOff") {
          Info.push(item);
          Info[index].Num_per_year = String(item.Num_per_year);
          Info[index].Num_can_add = String(item.Num_can_add);
        }
      });
    }
  };
  setDataGrid();

  return (
    <>
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Leave Type Update"
      >
        <FormLeaveTypeUpdate
          handleClose={handleClose}
          option={option}
          id={ID}
        />
      </ModalUpdate>
      <Grid container spacing={2} style={{ marginTop: "1px" }}>
        <Grid item xs={10} sm={7} >
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sm={5}
          style={{ display: "flex", justifyContent: "flex-end" }}
          className={classes.searchBox}
        >
          <Button
            variant="outlined"
            className={classes.ButtonAdd}
            onClick={onClickAdd}
          >
            <pre>+ ADD</pre>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sortingOrder={["desc", "asc"]}
            sortModel={sortModel}
            onSortModelChange={(model) =>
              Info.length !== 0 ? setSortModel(model) : ""
            }
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 50]}
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

export default CardLeaveTypeInformation;
