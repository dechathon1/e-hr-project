import React, { useState, useEffect } from 'react';
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
import { SidebarData } from './SidebarData';
import { getAccountInformation } from '../../identity/actions'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from '@mui/material/Skeleton';

const drawerWidth = 260;

const useStyles = makeStyles(() => ({
    drawer: {
        marginTop: '64px',
        width: drawerWidth,
        flexShrink: '0',
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    },
    listTopic: {
        // padding:'15px 0 10px 10px',
        margin: '0px 0px 0px 15px',
        color: '#C91F92',
        fontWeight: 'bold',
    },
    box: {
        // padding:'10px'
    },
    listItem: {
        [`& .css-cveggr-MuiListItemIcon-root`]: {
            minWidth: '30px',
            margin: '0 10px'
        },
        [`& .css-10hburv-MuiTypography-root   `]: {
            fontSize: '0.8rem'
        },
    },
    margintop: {
        marginTop: '20px',
    }

}));

function Sidebar() {
    const classes = useStyles()
    const navigate = useNavigate();
    // console.log(SidebarData);
    const dispatch = useDispatch()

    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    let Role = accountInformation.Role
    console.log(Role);
    return (
        <>
            <Drawer
                variant="permanent"
                className={classes.drawer}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }} className={classes.box}>
                    <div className={classes.margintop} />
                    {SidebarData.map((item, index) => {
                        return (
                            <List key={index}>
                                <div className={classes.listTopic}>
                                    {item.title}
                                </div>
                                {
                                    item.subNav.map((subItem) => {
                                        if (Role) {
                                            return (
                                                subItem.role.map((role) => {

                                                    if (role == Role) {
                                                        return (
                                                            <ListItem button key={subItem.path} className={classes.listItem}>
                                                                <ListItemIcon>
                                                                    {subItem.icon}
                                                                </ListItemIcon>
                                                                <ListItemText primary={subItem.title} />
                                                            </ListItem>
                                                        );
                                                    }
                                                })
                                            )
                                        } else {
                                            return (
                                                <ListItem button key={subItem.path} className={classes.listItem}>
                                                    <Skeleton width={'100%'} height={40} animation="wave" />
                                                </ListItem>
                                            );
                                        }

                                    })
                                }
                            </List>
                        )
                    })}
                </Box>
            </Drawer>
        </>

    );
}
export default Sidebar