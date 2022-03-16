import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getDayOffInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getDayOffAmount } from "../../../../utils/miscellaneous";
// import { deleteDayOff } from '../../actions';
import { headers } from "./headers";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import FormDayOffUpdate from "./FormDayOffUpdate";
const useStyles = makeStyles(() => ({
  ButtonAdd: {
    display: "flex",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
}));

const CardDayOff = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { dayOffInformation } = useSelector((state) => state.timeReducer);

  const [nowID, setNowID] = useState("");
  const [open, setopen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  let Header = headers;
  let Info = [];
  Header[headers.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    headerClassName: "bg-light-green",

    width: 70,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Update"
        onClick={onClickUpdate(params.id)}
      />,
    ],
  };

  useEffect(() => {
    dispatch(getDayOffInformation());
  }, []);

  const onClickUpdate = React.useCallback(
    (id) => () => {
      setopen(true);
      setNowID(id);
    },
    []
  );

  const handleClose = () => {
    setopen(false);
    setNowID("");
  };

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

  const setDataGrid = () => {
    if (Object.keys(dayOffInformation).length !== 0) {
      dayOffInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.Emp_id;
      });
      Info.reverse();
    }
  };

  setDataGrid();

  return (
    <>
      <ModalUpdate open={open} handleClose={handleClose} title="DayOff Update">
        <FormDayOffUpdate id={nowID} handleClose={handleClose} />
      </ModalUpdate>

      <Box className={classes.box}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            justifyItems: "center",
            alignItems: "center",
            pt: "10px",
            pb: "10px",
          }}
        >
          <QuickSearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Box>
        <DataGrid
          sortingOrder={["desc", "asc"]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
          headers={Header ? Header : ""}
          rows={searchText ? searchInfo : Info ? Info : ""}
        />
      </Box>
    </>
  );
};

export default CardDayOff;
