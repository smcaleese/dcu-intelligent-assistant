import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import arrowImage from '../assets/arrow.png'

const bgColor = "#4269E1"

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    classInfoTouchable: {
        backgroundColor: '#4269E1',
        height: 120,
        borderRadius: 10
    },
    classInfoBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    classInfoTextBox: {
        width: '80%',
        marginTop: 4,
        marginBottom: 4,
    },
    text: {
        textAlign: 'center',
        padding: 4,
        fontSize: 20,
        color: 'white',
        backgroundColor: '#4269E1'
    },
    arrowButton: {
        height: 30,
        width: 30,
        margin: 16
    },
    dropdownContentsContainer: {
        marginTop: -5,
        textAlign: 'center',
        backgroundColor: '#00ad77',
    },
    dropdownContentsText: {
        color: 'white',
        fontSize: 16,
        padding: 12,
        textAlign: 'center'
    }
});

export default function ClassInfoDropdown(props) {
    //Handle toggle for dropdowns
    const [dropdownActivated, setDropdown] = useState(true)
    const toggleDropdown = () => setDropdown(value => !value)
    
    //If undefined or null data is passed return nothing 
    if(!props.description || typeof props.description === "undefined") {
        return(
        <View>
            <Text>{props.description}</Text>
        </View>)
    }

    let location = null
    if(props.Location !== null) {
        location = <Text style={styles.dropdownContentsText}>Location: {props.Location}</Text>
    }
    const descriptionData = props.description.split("-") // eg. 'IT Architecture - seminar'
    const description = descriptionData[0]
    const classType = typeof descriptionData[1] !== "undefined" ? descriptionData[1] + "," : null

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.classInfoTouchable} underlayColor={bgColor} onPress={toggleDropdown} activeOpacity={1}>
                <View style={styles.classInfoBox}>
                    <View style={styles.classInfoTextBox}>
                        <Text style={styles.text}>{description}</Text>
                        <Text style={[styles.text, { fontWeight: 'bold' }]}>{props.startTime} - {props.endTime}</Text>
                    </View>
                    <View>
                        <Image style={styles.arrowButton} source={arrowImage} />
                    </View>
                </View>
            </TouchableHighlight>
            <View style={[styles.dropdownContentsContainer, dropdownActivated ? {} : { display: 'none' }]}>
                { location }
                <Text style={styles.dropdownContentsText}>Module Code: {props.Name}</Text>
                <Text style={styles.dropdownContentsText}>{classType} {props.EventType}</Text>
            </View>
        </View>
    )
}
