import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center', // Wycentrowanie tekstu
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
                position: 'relative',
                bottom: 0,
                width: '100%',
                display: 'flex', // Ustawienie flexboxa
                justifyContent: 'space-between', // Rozdzielenie zawartości na boki
                alignItems: 'center' // Wycentrowanie w pionie
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    Jakub Szaraj 2024©
                </Typography>
            </Container>
            <Box
                component="img"
                sx={{
                    height: 40,
                    width: 40,
                    marginRight: 2 // Dodanie odstępu od prawej
                }}
                alt="KI"
                src="/src/assets/ki.jpg" // Ścieżka do obrazka KI
            />
        </Box>
    );
};

export default Footer;
