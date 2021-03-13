import React, {useState} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import CustomChatBot from '../components/CustomChatBot';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { useFocusEffect } from '@react-navigation/native';
import { getClasses } from '../utils/GetClasses';
import { getBusByNumber, getBusByStop, getStopID } from '../utils/GetBus';
import { searchMap } from '../utils/GetMapInfo';
import { checkToken } from '../utils/Users';
import { getAssignments } from '../utils/Assignments';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default function ChatBotHome(props) {

    //Adjust keyboard when user accesses page
    useFocusEffect(() => {
        console.log("set keyboard to adjustResize")
        AndroidKeyboardAdjust.setAdjustResize()
    })

    // outputState preserves information in output so that it is still there 
    // when the "View Previos Output" button is pressed
    const [outputState, setOutputState] = useState({
        classesData: "no data",
        jsDate: ""
    })

    //Handle user intent for getting and displaying timetable data
    const handleTimeTable = (rawCourseCode, date, err) => {
        getClasses(rawCourseCode, date, err)
        .then((res) => {
            if(res === "server error") {
                console.log("server error: probably wrong course code")
                props.navigation.navigate("output", { classesData: "NA", jsDate: '' })
            } 
            else {
                const resData = {
                    classesData: res.classesData, 
                    dayOfTheWeek: res.dayOfTheWeek, 
                    jsDate: res.jsDate,
                    courseCode: res.courseCode
                }
                setOutputState(resData)
                props.setOutputTitle("Class Timetable")
                props.navigation.navigate("output", resData)
            }
        })
        .catch((err) => {
            console.log("server error:", err)
            props.navigation.navigate("output", { classesData: "NA", jsDate: '' })
        })
    }

    //Handle user intent for getting and displaying transport data by stop name/id/number
    const handleBusStop = (stop_data) => {
        getStopID(stop_data)
        .then(([stop_id, stop_name]) => {
            getBusByStop(stop_id)
            .then((res) => {
                console.log(res)
                console.log(stop_name)
                setOutputState({ times: res })
                props.setOutputTitle("Bus Timetable")
                props.navigation.navigate('bus', { times: res, input: stop_id, type: "stop"  })
            })
            .catch((err) => console.log(err))
        })
    }

    //Handle user intent for getting and displaying transpord data by bus number
    const handleBusNumber = (bus_number) => {
        getBusByNumber(bus_number)
        .then((res) => {
            setOutputState({ times: res })
            props.setOutputTitle("Bus Timetable")
            props.navigation.navigate('bus', { times: res, input: bus_number, type: "bus" })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //Handle user intent for getting and displaying map location
    const handleLocation = (location) => {
        searchMap(location)
        .then((res) => {
            props.setOutputTitle(res.title)
            setOutputState({ mapData: res })
            props.navigation.navigate('map', { mapData: res })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    //Handle user intent for getting and displaying Assignments
    const handleRequestForAssignments = async () => {
        // see if user has logged in the past 24h
        const token = await AsyncStorage.getItem("@token")
        const [tokenIsValid, email] = await checkToken(token)
        if(tokenIsValid) {
            const assignments = await getAssignments(email)
            console.log("assignments:", assignments)
            props.setOutputTitle("Assignments")
            props.navigation.navigate('assignments', { assignments: assignments })
        }
        else {
            console.log("tokenIsValid:", tokenIsValid, "email:", email)
            Alert.alert("please login to access your assignments")
        }
    }

    //Identify intent and call the correct function when user request 'fulfilled' by chatbot
    const handleComplete = (err, confirmation) => {
        console.log("handleComplete")
        console.log("confirmation in ChatBotStack:", confirmation)
        
        switch(confirmation.intentName) {
            case("getClasses"):
                console.log("CASE 1: getClasses")
                handleTimeTable(confirmation["slots"].course, confirmation["slots"].date, err)
                break;
            case ("getBusByStop"):
                console.log("Case 2: getBusByStop")
                handleBusStop(confirmation["slots"].busstop)
                break;
            case ("getBusByNumber"):
                console.log("Case 3: getBusByNumber")
                handleBusNumber(confirmation["slots"].busnum)
                break;
            case ("getLocation"):
                console.log("Case 4: getLocation")
                handleLocation(confirmation["slots"].location)
                break;
            case ("getAssignments"):
                console.log("Case 5: getAssignments")
                handleRequestForAssignments()
        }
    }

    const goToOutput = () => {
        props.navigation.navigate("output", outputState)
    }
    
    return (
        <View style={styles.container}>
            <CustomChatBot
                style={styles.chatbot}
                goToOutput={goToOutput}
                handleComplete={handleComplete}
            />
        </View>
    )
}