import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { isExpired } from "react-jwt";

interface NavbarProps {
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
    const navigate = useNavigate();
    const isLoggedIn = !isExpired(localStorage.getItem('token') as string);
    const username = localStorage.getItem('username');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        handleClose();
        navigate('/loginfirst');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    IoT Dashboard
                </Typography>
                <Switch onChange={toggleTheme} />
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" component={Link} to="/add-data/0">Add Data</Button>
                        <Button color="inherit" component={Link} to="/devices state">Devices</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 2 }}>
                            Witaj, {username}
                        </Typography>
                        <IconButton color="inherit" onClick={handleMenu}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
