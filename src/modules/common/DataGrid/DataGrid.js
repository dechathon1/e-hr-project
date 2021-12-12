import React, { useEffect, useState } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import styles from './styles';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';


const useStyles = makeStyles(styles)


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

const DataGridCustom = ({
  headers,
  rows,
  pageSize = 5,
  rowsPerPageOptions = [5],
  checkboxSelection = false,
  loading = false,
  disablePagination = false,
}) => {
  const classes = useStyles()
  return (
    <TableContainer component={Card} className={classes.card}>
      {
        !disablePagination ?
          <StyledDataGrid
            rows={rows}
            columns={headers}
            pageSize={pageSize}
            disableExtendRowFullWidth={true}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkboxSelection}
            autoHeight={true}
            autoWidth={true}

          /> :
          <StyledDataGrid
            rows={rows}
            columns={headers}
            pageSize={pageSize}
            disableExtendRowFullWidth={true}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkboxSelection}
            autoHeight={true}
            autoWidth={true}
            components={{
              Footer: () => <div></div>,
            }}
          />
      }

    </TableContainer>


  )
}

export default DataGridCustom


