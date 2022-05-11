import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { BarChart as BarChartIcon } from "react-feather";
import NavItem from "./NavItem";
// import firebase from "firebase";
import { useState } from "react";
import { StorageOutlined } from "@material-ui/icons";
import { auth } from "../../../fire.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

const items = [
    {
        href: "/",
        icon: BarChartIcon,
        title: "Dashboard",
    },
    {
        href: "/Storage",
        icon: StorageOutlined,
        title: "Storage",
    },
];

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256,
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: "calc(100% - 64px)",
    },
    avatar: {
        cursor: "pointer",
        width: 64,
        height: 64,
    },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();
    const [userData, setUserData] = useState({
        displayName: "Admin",
        email: "",
    });

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const getUserName = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then((val) => {
                    console.log(val);
                    localStorage.setItem("token", val);
                });
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                });
            }
        });
    };
    useEffect(() => {
        getUserName();
    }, []);

    const content = (
        <Box height="100%" display="flex" flexDirection="column">
            <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                p={2}
            >
                <Avatar
                    className={classes.avatar}
                    component={RouterLink}
                    to="/app/account"
                >
                    {userData.email[0]}
                </Avatar>
                <Typography
                    className={classes.name}
                    color="textPrimary"
                    variant="h5"
                >
                    {userData.email}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    Admin
                </Typography>
            </Box>
            <Divider />
            <Box p={2}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box flexGrow={1} />
            <Box p={2} m={2}>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            signOut(auth);
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.mobileDrawer }}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.desktopDrawer }}
                    open
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
    onMobileClose: () => {},
    openMobile: false,
};

export default NavBar;
