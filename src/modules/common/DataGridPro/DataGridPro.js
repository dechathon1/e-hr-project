import React, { useEffect, useState } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card';
import styles from './styles';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import {  GridOverlay,DataGridPro } from '@mui/x-data-grid-pro';

const useStyles = makeStyles(styles)


const StyledDataGrid = styled(DataGridPro)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
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
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    padding:'0px',

  }, 

}));

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}
const DataGridProCustom = ({
  headers,
  rows,
  pageSize = 5,
  rowsPerPageOptions = [5],
  checkboxSelection = false,
  loading = false,
  disablePagination = false,
  className,
  ...props
}) => {
  const classes = useStyles()
  return (
    <TableContainer component={Card} className={classes.card}>
      {
        !disablePagination ?
          <StyledDataGrid
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            loading={loading}
            rows={rows}
            columns={headers}
            pageSize={pageSize}
            disableExtendRowFullWidth={true}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkboxSelection}
            autoHeight={true}
            autoWidth={true}
            className={className}
            {...props}
          /> :
          <StyledDataGrid
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            loading={loading}
            rows={rows}
            columns={headers}
            pageSize={pageSize}
            disableExtendRowFullWidth={true}
            rowsPerPageOptions={rowsPerPageOptions}
            checkboxSelection={checkboxSelection}
            autoHeight={true}
            autoWidth={true}
            className={className}
            components={{
              Footer: () => <div></div>,
            }}
            {...props}
          />
      }

    </TableContainer>


  )
}

export default DataGridProCustom


