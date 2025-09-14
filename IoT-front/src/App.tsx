import './App.css';
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from "./components/Dashboard";
import DevicesHour from "./components/DevicesHour";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/Login';
import AddDataForm from './components/AddDataForm';
import { isExpired } from "react-jwt";
import Loginfirst from './components/Loginfirst';
import { useState } from 'react';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const PrivateRoute = ({ element, ...rest }) => {
    const isLoggedIn = !isExpired(localStorage.getItem('token') as string);
    return isLoggedIn ? element : <Navigate to="/loginfirst" />;
};

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <Router>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}
                >
                    <Navbar toggleTheme={toggleTheme} />
                    <Box sx={{ flex: '1 0 auto' }}>
                        <Routes>
                            <Route path="/loginfirst" element={<Loginfirst />} />
                            <Route path="/device/:id" element={<PrivateRoute element={<Dashboard />} />} />
                            <Route path="/devices state" element={<PrivateRoute element={<DevicesHour />} />} />
                            <Route path="/" element={<PrivateRoute element={<Home />} />} />
                            <Route path="/register" element={!isExpired(localStorage.getItem('token') as string) ? <Navigate replace to="/" /> : <SignUpForm />} />
                            <Route path="/login" element={!isExpired(localStorage.getItem('token') as string) ? <Navigate replace to="/" /> : <LoginForm />} />
                            <Route path="/add-data/:id" element={<PrivateRoute element={<AddDataForm />} />} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </ThemeProvider>
        </Router>
    );
};

export default App;
