import React, { useState, useEffect } from "react";

import moment from "moment";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";

function renderEmergency(params) {
  if (params.value) {
    return "Y";
  } else {
    return "N";
  }
}

export const headers = [
  {
    field: "Begin",
    headerName: "Begin",    
    width:190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "End",
    headerName: "End",
    width:190,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Type_name",
    headerName: "Type",
    width:110,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Emergency",
    headerName: "Emergency",
    flex: 0.4,
    headerClassName: "bg-light-green",
    renderCell: renderEmergency,
  },
  {
    field: "Leave_status",
    headerName: "Status",
    headerClassName: "bg-light-green",
    width:170,
    renderCell: renderCellExpand,
  },
  {
    field: "Amount",
    headerName: "Amount (Hrs)",
    width:170,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Detail",
    headerName: "Description",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
  {
    field: "Comment",
    headerName: "Comment",
    flex: 1,
    headerClassName: "bg-light-green",
    renderCell: renderCellExpand,
  },
];
