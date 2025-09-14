import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, MenuItem, InputAdornment } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TemperatureIcon from '@mui/icons-material/DeviceThermostat';
import PressureIcon from '@mui/icons-material/Compress';
import HumidityIcon from '@mui/icons-material/Opacity';
import axios from 'axios';
import serverConfig from '../server-config';

const AddDataForm: React.FC = () => {
    const [deviceId, setDeviceId] = useState<string>('');
    const [values, setValues] = useState([{ id: 1, value: '' }, { id: 2, value: '' }, { id: 3, value: '' }]);
    const [error, setError] = useState<string | null>(null);

    const handleDeviceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDeviceId(event.target.value);
    };

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newValues = [...values];
        newValues[index].value = event.target.value;
        setValues(newValues);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post(`${serverConfig.serverUrl}data/${deviceId}`, { air: values });
            setDeviceId('');
            setValues([{ id: 1, value: '' }, { id: 2, value: '' }, { id: 3, value: '' }]);
            setError(null);
        } catch (error) {
            setError('Failed to add data.');
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${serverConfig.serverUrl}data/${deviceId}`);
            setDeviceId('');
            setValues([{ id: 1, value: '' }, { id: 2, value: '' }, { id: 3, value: '' }]);
            setError(null);
        } catch (error) {
            setError('Failed to delete data.');
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Wybierz urządzenie oraz podaj wartości
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        select
                        label="Select Device"
                        value={deviceId}
                        onChange={handleDeviceChange}
                        fullWidth
                        variant="outlined"
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(id => (
                            <MenuItem key={id} value={id}>
                                Device {id}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                {values.map((item, index) => {
                    const IconComponent = index === 0 ? TemperatureIcon : index === 1 ? PressureIcon : HumidityIcon;
                    return (
                        <Box key={item.id} mb={2}>
                            <TextField
                                label={`Value ${item.id}`}
                                value={item.value}
                                onChange={(e) => handleChange(index, e)}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconComponent />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    );
                })}
                <Box mt={3} mb={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: '#6abf69', color: 'white' }}
                        fullWidth
                        startIcon={<AddCircleIcon />}
                    >
                        Add Data
                    </Button>
                </Box>
                <Box mt={3} mb={2}>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        sx={{ backgroundColor: '#ef5350', color: 'white' }}
                        fullWidth
                        startIcon={<DeleteIcon />}
                    >
                        Delete Data
                    </Button>
                </Box>
                {error && (
                    <Box mt={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}
            </form>
        </Container>
    );
};

export default AddDataForm;
