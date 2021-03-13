import { apiURL } from '../config';
import axios from 'axios';
import { mapSearchEngine } from './MapSearchEngine';

export const getMapData = async () => {
    try {
        const res = await axios.get(apiURL + 'mapData')
        return res.data
    } 
    catch(err) {
        console.log("error:", err)
    }
}

export const searchMap = async (location) => {
    try {
        const mapData = await getMapData()
        const [title, coords] = mapSearchEngine(location, mapData.locations)
        return { title, coords }
    }
    catch(err) {
        console.log("error:", err)
    }
}