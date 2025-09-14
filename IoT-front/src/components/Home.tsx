import './DeviceState.css';
import {useState, useEffect} from "react";
import serverConfig from "../server-config";
import DevicesState from "./DevicesState";
import {sortElemsByDeviceId} from "../utils/helper";
import Loader from "./shared/Loader";
import {DataModel} from "../models/data.model";

function Home() {

    const [data, setData] = useState<DataModel[] | null>(null);
    const [sdata, setSecondData] = useState<DataModel[] | null>(null);
    const [loaderState, setLoaderState] = useState(true);

    useEffect(() => {
        fetchData();
        fetchSecondData();
    }, []);

    const fetchData = () => {
        setLoaderState(true);
        fetch(`${serverConfig.serverUrl}data/latest`)
            .then(response => response.json())
            .then(data => {
                setData(sortElemsByDeviceId(data));
                setLoaderState(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    const fetchSecondData = () => {
        setLoaderState(true);
        fetch(`${serverConfig.serverUrl}data/beforelatest`)
            .then(response => response.json())
            .then((sdata: DataModel[]) => {
                const sortedsData = sortElemsByDeviceId([...sdata]);
                setSecondData(sortedsData);
                setLoaderState(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    return (
        <>
            <div style={{backgroundColor: '#000', display: 'flex', justifyContent: 'center'}}>
                {loaderState &&
                    <div style={{marginTop: '50vh'}}>
                        <Loader/>
                    </div>
                }
                {!loaderState && data && sdata &&<DevicesState data={data} sdata={sdata}/>}
            </div>
        </>
    )
}

export default Home;
