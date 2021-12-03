import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
    drawer:{
        marginTop:'64px',
        width: drawerWidth,
        flexShrink: '0',
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }
}));

function Sidebar() {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <>
            <Drawer
                variant="permanent"             
                className={classes.drawer}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>

                </Box>
            </Drawer>
        </>

    );
}
export default Sidebar