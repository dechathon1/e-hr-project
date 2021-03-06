import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getTeamsInformation } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import FormAddMember from "./FormAddMember";
import { deleteMember } from "../actions";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../common/DataGrid";
import ModalUpdate from "../../common/ModalUpdate";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getMemberInformation } from "../actions";
import { Grid } from "@mui/material";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { headers } from "./headersmember";

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
}));

const CardTeamMembers = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { memberInformation } = useSelector((state) => state.teamReducer);
  const { teamID, host } = props;

  const [open, setopen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);

  let Header = headers;
  let Info = [];
  Header[Header.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    headerClassName: "bg-light-green",
    width: 90,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteForeverIcon />}
        label="Delete"
        disabled={params.row.Name === host ? true : false}
        onClick={onClickDelete(params.id)}
      />,
    ],
  };
  useEffect(() => {
    dispatch(getTeamsInformation());
    dispatch(getMemberInformation("", "", teamID));
  }, []);

  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    if (deleteID !== "" && confirmDelete) {
      const onDelete = async (id) => {
        await deleteMember(teamID, [id]);
        dispatch(getMemberInformation("", "", teamID));
      };
      onDelete(deleteID);
      setDeleteID("");
      setConfirmDelete(false);
    }
  }, [deleteID, confirmDelete]);

  const ConfirmDelete = () => {
    setConfirmDelete(true);
    handleCloseDialog();
  };

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
      setOpenDialog(true);
    },
    []
  );

  const onClickAdd = () => {
    setopen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          console.log(row[field].toString());
          return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
  };

  const setDataGrid = () => {
    if (Object.keys(memberInformation).length !== 0) {
      memberInformation.data.map((item, index) => {
        Info.push(item);
      });
    }
  };
  setDataGrid();
  return (
    <>
      <ConfirmDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        onClick={ConfirmDelete}
        message={"Do you insist on deleting member ?"}
      />
      <ModalUpdate open={open} handleClose={handleClose} title="Add Member">
        <FormAddMember
          handleClose={handleClose}
          Info={Info}
          teamID={teamID}
          host={host}
        />
      </ModalUpdate>

      <Box className={classes.box}>
        <Grid container spacing={2} style={{ marginTop: "1px" }}>
          <Grid item xs={9} sm={7}>
            <QuickSearchToolbar
              value={searchText}
              onChange={(event) => requestSearch(event.target.value)}
              clearSearch={() => requestSearch("")}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sm={5}
            style={{ display: "flex", justifyContent: "flex-end" }}
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
              rowsPerPageOptions={[5, 10, 20, 50]}
              pagination
              headers={Header ? Header : ""}
              rows={searchText ? searchInfo : Info ? Info : ""}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CardTeamMembers;
