import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { Search } from 'react-native-feather';
import {mapBoxGLToken} from '../config';
import { MapPin, Minus } from 'react-native-feather';
import GestureRecognizer from 'react-native-swipe-gestures';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { useFocusEffect } from '@react-navigation/native';
import { getMapData, searchMap } from '../utils/GetMapInfo';
import DropDownPicker from 'react-native-dropdown-picker';

MapboxGL.setAccessToken(mapBoxGLToken);

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        backgroundColor: 'white',
        paddingLeft: 20,
        padding: 5
    },
    buttonStyles: {
        backgroundColor: '#c5c5c5',
        justifyContent: 'center',
        padding: 10
    },
    locationInfo: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    dropDownBox: {
        flexDirection: 'row'
    },
    dropDownContainer: {
        flex: 1,
        height: 60
    },  
    dropDown: {
        backgroundColor: '#f8f8f8'
    },
    dropDownText: {
        fontSize: 16
    },
    dropDownItem: {
        justifyContent: 'flex-start'
    },
    dropDownLabel: {
        padding: 2
    },
    customButton: {
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    customButtonText: {
        padding: 12,
        color: 'white'
    }
});

export default function MapHome(props) {

    //Adjust keyboard on screen focus
    useFocusEffect(() => {
        console.log("set keyboard to adjustPan")
        AndroidKeyboardAdjust.setAdjustPan()
    })

    //Default location (The one displayed initially)
    const [mapData, setMapData] = useState({
        coords: [-6.258485, 53.385639],
        title: 'The Mall'
    })

    //Location of primary (red) pin
    const [marker, setMarker] = useState({
        latitude: mapData.coords[1],
        longitude: mapData.coords[0]
    });

    //Center screen on selected location
    const [viewport, setViewport] = useState({
        latitude: mapData.coords[1],
        longitude: mapData.coords[0],
        zoom: 16,
    });

    //Get all locations from server
    const getLocations = () => {
        getMapData()
        .then((locationsJson) => {
            let locationsArr = []
            locationsJson["locations"].forEach((locationObj) => {
                locationsArr.push({
                    label: locationObj["properties"].title,
                    value: locationObj["properties"].title,
                    coords: locationObj["geometry"].coordinates
                })
            })
            setLocations(locationsArr)
        })
        .catch((err) => (console.log(err)))
    }

    const [dropDownState, setDropDownState] = useState("")
    const [locations, setLocations] = useState(getLocations)
    let controller // controller for dropdown

    // location info is the popup at the bottom of the screen below the map that shows information about a location
    const [locationInfoTitle, setLocationInfoTitle] = useState("")
    const [showLocationInfo, toggleShowLocationInfo] = useState(true)

    const updateMap = (title, coords) => {
        toggleShowLocationInfo(true)
        setLocationInfoTitle(title)
        setMarker({ latitude: coords[1], longitude: coords[0] })
        setViewport({ latitude: coords[1], longitude: coords[0] }) 
    }

    useEffect(() => {
        // information from chatbot
        if(typeof props.route.params !== "undefined") {
            const data = props.route.params.mapData 
            const { title, coords } = data
            console.log("title, coords:", title, coords)
            updateMap(title, coords)
        }
    }, [])

    const handleSubmit = async () => {
        props.setOutputTitle(dropDownState)
        try {
            const { title, coords } = await searchMap(dropDownState)
            console.log("title:", title, "coords:", coords)   
            updateMap(title, coords)
        } 
        catch(err) {
            console.log("error:", err)
        }
    }

    const handleDropDownChange = (item) => {
        setDropDownState(item.value)
    }

    return (
        <View style={styles.page}>
            <View style={styles.dropDownBox}>
                <DropDownPicker
                    items={locations}
                    defaultValue={dropDownState}
                    controller={instance => controller = instance}
                    dropDownMaxHeight={400}
                    placeholder="Select a building"
                    containerStyle={styles.dropDownContainer}
                    style={styles.dropDown}
                    globalTextStyle={styles.dropDownText}
                    itemStyle={styles.dropDownItem}
                    labelStyle={styles.dropDownLabel}
                    onChangeItem={item => {handleDropDownChange(item)}}
                />
                <TouchableOpacity activeOpacity={0.9} style={styles.customButton} onPress={() => handleSubmit()}>
                    <Text style={styles.customButtonText}>submit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <MapboxGL.MapView
                    styleURL="mapbox://styles/smcaleese/ckkfnyon906l217pa2bqjgyqo"
                    zoomLevel={18}
                    centerCoordinate={[viewport.longitude, viewport.latitude]}
                    style={styles.map}
                >
                    <MapboxGL.Camera
                        zoomLevel={15}
                        animationMode={'flyTo'}
                        animationDuration={500}
                        centerCoordinate={[viewport.longitude, viewport.latitude]}
                    />
                    <MapboxGL.PointAnnotation coordinate={[marker.longitude, marker.latitude]} id={"point-annotation"} >
                        <View>
                            <MapPin stroke="#fff" fill="red" height={50} width={50} />
                        </View>
                    </MapboxGL.PointAnnotation>

                </MapboxGL.MapView>
                {showLocationInfo ?
                    <GestureRecognizer onSwipeDown={() => toggleShowLocationInfo(false)}>
                        <View style={[styles.locationInfo, { height: '25%' }]}>
                            <Minus stroke="#000" height={40} width={100} />
                            <Text style={{fontSize: 24}}>{locationInfoTitle}</Text>
                        </View>
                    </GestureRecognizer>
                : null}
            </View>
        </View >
    )
}
