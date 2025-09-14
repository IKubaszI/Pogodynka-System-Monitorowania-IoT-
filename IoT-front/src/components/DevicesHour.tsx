import { useEffect, useState } from 'react';
import DevicesState from "./DevicesState";
import Charts from "./Charts";
import serverConfig from "../server-config";
import { sortElemsByDeviceId } from "../utils/helper";
import { useParams } from "react-router-dom";
import Loader from "./shared/Loader";
import { DataModel } from "../models/data.model";

function DevicesHour() {
    let { id } = useParams();
    const [data, setData] = useState<DataModel[]>([]);
    const [sdata, setSecondData] = useState<DataModel[]>([]);
    const [additionalData, setAdditionalData] = useState<DataModel[]>([]);
    const [loaderState, setLoaderState] = useState(true);
    const [loaderChart, setLoaderChart] = useState(true);

    useEffect(() => {
        fetchData();
        fetchSecondData();
        fetchAdditionalData();
        fetchToken();
    }, [id]);

    const fetchData = () => {
        setLoaderState(true);
        fetch(`${serverConfig.serverUrl}data/latest`)
            .then(response => response.json())
            .then((data: DataModel[]) => {
                const sortedData = sortElemsByDeviceId([...data]);
                setData(sortedData);
                setLoaderState(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoaderState(false);
            });
    };

    const fetchSecondData = () => {
        setLoaderState(true);
        fetch(`${serverConfig.serverUrl}data/beforelatest`)
            .then(response => response.json())
            .then((sdata: DataModel[]) => {
                const sortedSData = sortElemsByDeviceId([...sdata]);
                setSecondData(sortedSData);
                setLoaderState(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoaderState(false);
            });
    };

    const fetchAdditionalData = () => {
        setLoaderChart(true);
        fetch(`${serverConfig.serverUrl}data/lhour`)
            .then(response => response.json())
            .then((data: DataModel[]) => {
                setAdditionalData(data);
                setLoaderChart(false);
            })
            .catch(error => {
                console.error('Error fetching additional data:', error);
                setLoaderChart(false);
            });
    };

    const fetchToken = () => {
        setLoaderState(true);
        fetch("http://localhost:3100/api/posts", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token') || ''
            }
        }).finally(() => setLoaderState(false));
    };

    const handleDelete = async (deviceId: number) => {
        try {
            await fetch(`${serverConfig.serverUrl}data/${deviceId}`, {
                method: 'DELETE'
            });
            // Update data state to reflect the deletion
            setData(prevData => prevData.map(device =>
                device.deviceId === deviceId ? { ...device, temperature: undefined, pressure: undefined, humidity: undefined } : device
            ));
            setSecondData(prevData => prevData.map(device =>
                device.deviceId === deviceId ? { ...device, temperature: undefined, pressure: undefined, humidity: undefined } : device
            ));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <>
            <div style={{
                display: 'flex',
                height: '50vh',
                alignItems: 'center',
                justifyContent: "space-evenly",
                borderBottom: '10px solid #fff',
                padding: '50px'
            }}>
                <div><h1 style={{ fontSize: '50px' }}>Last Hour</h1></div>
                <div>
                    {loaderChart && <Loader />}
                    {!loaderChart && additionalData.length > 0 && <Charts data={additionalData} />}
                </div>
            </div>

            <div style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center' }}>
                {loaderState && <Loader />}
                {!loaderState && data.length > 0 && sdata.length > 0 && <DevicesState data={data} sdata={sdata} onDelete={handleDelete} />}
            </div>
        </>
    );
}

export default DevicesHour;
