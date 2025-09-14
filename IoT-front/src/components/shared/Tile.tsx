import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link} from 'react-router-dom';
import {DataModel} from "../../models/data.model";

export interface DModel {
    humidity?: number;
    pressure?: number;
    temperature?: number;
}
interface TileProps {
    data: DataModel | null;
    prevdata: DataModel | null;
    id?: string | number,
    hasData?: boolean,
    details?: boolean,
    active?: boolean
}
function isDifferent(data:DataModel|null, prevdata:DataModel|null) {
    if (!data || !prevdata) return false;
    const keysToCheck: (keyof DataModel)[] = ['humidity', 'pressure', 'temperature'];
    return keysToCheck.some(key => {
        const currentValue = data[key] as number;
        const previousValue = prevdata[key] as number;
        if (currentValue == null || previousValue == null) return false;

        return Math.abs((currentValue - previousValue) / previousValue) >= 0.2;
    });
}
function Tile({id, hasData, data,prevdata, active = false, details = true,}: TileProps) {
    const diff=isDifferent(data,prevdata);
    const bgColor = diff ? '#701f28' : 'default';
    return (

        <Card className={`tile-device-inside ${active ? 'active' : ''}`} sx={{minWidth: 275}}>
            <CardContent style={{minHeight: '200px',backgroundColor:bgColor}}>
                <Typography style={{borderBottom: '5px solid #fff', paddingBottom: '10px'}} variant="h5"
                            component="div">
                    Device No. {id}
                </Typography>
                {!hasData && <Typography variant="h6"
                                         component="div">
                    No data
                </Typography>}
                {hasData && <Typography style={{paddingTop: '10px'}} component="div">
                    <Typography variant="h6" component="div">
                        <DeviceThermostatIcon></DeviceThermostatIcon>
                        <span className="value">{data?.temperature}</span> <span>&deg;C</span>
                    </Typography>
                    <Typography variant="h6" component="div">
                        <CloudUploadIcon></CloudUploadIcon>
                        <span className="value">{data?.pressure}</span> hPa
                    </Typography>
                    <Typography variant="h6" component="div">
                        <OpacityIcon></OpacityIcon>
                        <span className="value">{data?.humidity}</span>%
                    </Typography>
                </Typography>}
            </CardContent>
            {details && <CardActions>
                <Button size="small" component={Link} to={`/device/${id}`}>Details</Button>
            </CardActions>}
        </Card>

    );
}

export default Tile;
