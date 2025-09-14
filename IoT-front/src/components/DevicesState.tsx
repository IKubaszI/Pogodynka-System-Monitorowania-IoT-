import React from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';
import { DataModel } from '../models/data.model';
import { Link } from 'react-router-dom';
import TemperatureIcon from '@mui/icons-material/DeviceThermostat';
import PressureIcon from '@mui/icons-material/Compress';
import HumidityIcon from '@mui/icons-material/Opacity';
import WarningIcon from '@mui/icons-material/Warning';

interface DevicesStateProps {
    data: DataModel[];
    sdata: DataModel[];
}

const DevicesState: React.FC<DevicesStateProps> = ({ data, sdata }) => {
    const isValueAboveThreshold = (current: number | undefined, previous: number | undefined) => {
        if (current === undefined || previous === undefined) return false;
        const difference = Math.abs(current - previous);
        return difference >= 20;
    };

    const getBorderColor = (device: DataModel, index: number) => {
        const temperatureDiff = isValueAboveThreshold(device.temperature, sdata[index]?.temperature);
        const pressureDiff = isValueAboveThreshold(device.pressure, sdata[index]?.pressure);
        const humidityDiff = isValueAboveThreshold(device.humidity, sdata[index]?.humidity);

        const diffCount = [temperatureDiff, pressureDiff, humidityDiff].filter(Boolean).length;

        if (diffCount >= 2) {
            return '#8a2be2';
        }
        if (temperatureDiff) {
            return '#0ff';
        }
        if (pressureDiff) {
            return '#ffa500';
        }
        if (humidityDiff) {
            return '#e700ff';
        }
        return 'none';
    };

    const hasSignificantChange = (device: DataModel, index: number) => {
        return (
            isValueAboveThreshold(device.temperature, sdata[index]?.temperature) ||
            isValueAboveThreshold(device.pressure, sdata[index]?.pressure) ||
            isValueAboveThreshold(device.humidity, sdata[index]?.humidity)
        );
    };

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
            {data.map((device, index) => (
                <Paper
                    key={device.deviceId}
                    sx={{
                        padding: 2,
                        margin: 2,
                        width: 200,
                        border: getBorderColor(device, index) !== 'none' ? `2px solid ${getBorderColor(device, index)}` : '1px solid #ccc'
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">Device No. {device.deviceId}</Typography>
                        {hasSignificantChange(device, index) && (
                            <WarningIcon sx={{ color: 'red', animation: 'pulsate 1s infinite' }} />
                        )}
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                        <TemperatureIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            {device.temperature !== undefined ? `${device.temperature} °C` : 'No data'}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                        <PressureIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            {device.pressure !== undefined ? `${device.pressure} hPa` : 'No data'}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                        <HumidityIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            {device.humidity !== undefined ? `${device.humidity} %` : 'No data'}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ marginTop: 2, marginRight: 1, backgroundColor: 'teal', color: 'white' }}
                        component={Link}
                        to={`/device/${device.deviceId}`}
                    >
                        Detail
                    </Button>
                </Paper>
            ))}
        </Box>
    );
};

export default DevicesState;
