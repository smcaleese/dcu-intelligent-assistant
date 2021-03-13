import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center'
    },
    leftSection: {
        backgroundColor: '#4269E1',
        width: 70,
        height: 70,
        padding: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center'
    },
    middleSection: {
        backgroundColor: 'white',
        width: '45%', // percentage is better for smaller screens
        height: 70,
        padding: 5,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#d3d3d3',
        overflow: 'hidden',
        margin: 0,
        justifyContent: 'center'
    },
    rightSection: {
        backgroundColor: '#4269E1',
        width: 70,
        height: 70,
        padding: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleText: {
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    secondaryText: {
        textAlign: 'center',
        fontSize: 12
    },
    timeText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    icon: {
        width: '100%',
        textAlign: 'center'
    }
})

export default function BusTile(props) {
    //Get just the hours and minutes of the arrival time
    const arrival_time = props.stop.arrival_time.split('T')[1].substring(0, 5)
    return (
        <View>
            <View style={styles.container}>
                {/* Stop Number */}
                <View style={styles.leftSection}>
                    <Text style={[styles.titleText, {color: 'white'}]}>{props.stop.bus_number}</Text>
                    <Icon style={styles.icon} name="bus-stop" size={24} color="#FFF" />
                </View>
                {/* Bus Head Sign + Scheduled Arrival Time */}
                <View style={styles.middleSection}>
                    <Text style={[styles.titleText, {fontSize: 12}]}>{props.stop.trip_headsign}</Text>
                    <Text style={styles.secondaryText}>{arrival_time}</Text>
                </View>
                {/* The Amount of time until the bus arrives */}
                <View style={styles.rightSection}>
                    <Text style={styles.timeText}>{props.stop.time_diff}</Text>
                    <Text style={styles.timeText}>mins</Text>
                </View>
            </View>
        </View>
    )
}