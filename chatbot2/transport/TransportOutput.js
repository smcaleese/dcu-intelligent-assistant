import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import BusTile from '../components/BusTile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import { getBusByStop, getBusByNumber } from '../utils/GetBus';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    titleContainer: {
        backgroundColor: "#4269E1",
        width: "95%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
        marginTop: 50
    },
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        color: "white"
    },
    bg: {
        marginTop: 0,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: "100%",
        height: "65%"
    }, 
    stopTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1.5,
        margin: 10,
        marginBottom: 16
    },
    stopTitle: {
        color: "#535353",
        padding: 2,
        fontSize: 18,
        textAlign: 'center',
        width: '80%'
    },
    stopicon: {
        textAlign: 'center',
        width: "20%"
    },
    button: {
        width: '60%',
        margin: 10,
        borderRadius: 5,
        padding: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default function TransportOutput(props) {
    //Sort the Array of inputs but time diffrence (Which one is arriving next)
    const [timeState, setTimeState] = useState(props.route.params.times.sort((a,b) => a.time_diff > b.time_diff ? 1 : -1))

    // Reduce function from https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key
    //Groups all the bus times in the array by stop
    const groupedByStop = timeState.reduce((r, time) => {
        r[time.stop_name] = r[time.stop_name] || [];
        r[time.stop_name].push(time);
        return r;
    }, Object.create(null))

    //Allows a user to update the results
    const handleRefresh = () => {
        if (props.route.params.type === "bus"){
            getBusByNumber(props.route.params.input)
            .then((res) => {
                setTimeState(res.sort((a,b) => a.time_diff > b.time_diff ? 1 : -1))
            })
            .catch((err) => console.log(err))
        }
        else{
            getBusByStop(props.route.params.input)
            .then((res) => {
                setTimeState(res.sort((a,b) => a.time_diff > b.time_diff ? 1 : -1))
            })
            .catch((err) => console.log(err))
        }
    }

    console.log("groupedByStop:", groupedByStop)

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Bus Times</Text>
            </View>
            <View style={styles.bg}>
                {timeState.length ?
                <>
                    <ScrollView style={styles.scrollView}>
                        <View>
                        {Object.keys(groupedByStop).map((stop, index) => {
                                return(
                                    <View key={index}>
                                        <View style={styles.stopTitleContainer}>
                                            <Text style={styles.stopTitle}>{stop}</Text>
                                        </View>
                                        <View>
                                        {groupedByStop[stop].map((time, index) => {
                                            return(
                                                <BusTile key={index} stop={time} />
                                            );
                                            })
                                        }
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </ScrollView>
                    <View style={{margin: 10}}>
                        <CustomButton title="Refresh" color="#4269E1" onPress={handleRefresh} />
                    </View>
                    </>
                :
                    <Text style={styles.stopTitle}>Sorry no buses arriving in the next hour. Please try again later.</Text>
                }
            </View>
        </View>
    )
}