import axios from 'axios';
import { apiURL } from '../config'

export const getStops = async () => {
    return new Promise((resolve) => {
        axios.get(apiURL + "getBusStops")
        .then((res) => {
            resolve(res.data)
        })
        .catch(() => console.error("Could not get bus stops"))
    })
}

export const getBusByStop = async (stop_id) => {
    return new Promise((resolve) => {
        axios.post(apiURL + "getStopTimetable", {
            stop_id: stop_id
        })
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => console.error(err))
    })
}

export const getBusByNumber = async (bus_number) => {
    return new Promise((resolve) => {
        axios.post(apiURL + "getBusTimetable", {
            bus_number: bus_number.toUpperCase()
        })
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => console.error(err))
    })
}

export const getStopID = async (stop_data) => {
    return new Promise((resolve, reject) => {
        axios.get(apiURL + "getBusStops")
        .then((res) => {
            res.data.stops.forEach((stop) => {
                if (Object.values(stop).findIndex(item => item.toLowerCase() === stop_data.toLowerCase()) !== -1 || Object.values(stop).findIndex(item => item.toLowerCase() === ("stop " + stop_data).toLowerCase()) !== -1){
                    resolve([stop.stop_id, stop.stop_name])
                }
            });
            reject("Error: No stop id could be identified")
        })
        .catch(() => console.error("Could not get bus stops"))
    })
}