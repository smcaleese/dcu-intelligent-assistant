import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBusByStop, getBusByNumber, getStops } from '../utils/GetBus';
import CustomButton from '../components/CustomButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    titleContainer: {
        backgroundColor: "#4269E1",
        width: "80%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
        marginTop: 50
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        color: "white",
        padding: 5
    },
    form: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 30,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropDownContainer: {
        height: 50, 
        width: '80%'
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
    busNumInput: {
        borderWidth: 1,
        borderColor: "#c3c3c3",
        borderRadius: 5,
        paddingLeft: 20,
        width: '80%',
        height: 50,
        fontSize: 16
    },
    customButtonView: {
        margin: 16
    }
})

export default function TransportHome(props) {

    //Gets a list of all stops around DCU from server. Used for the dropdown items
    const getStopData = () => {
        getStops()
        .then((res) => {
            busStops = []
            res.stops.forEach((stop) => {
                busStops.push({label: stop.stop_name + (stop.stop_number.replace('stop ', ' ')), value: stop.stop_id, icon: () => <Icon name="bus-stop" size={18} color="#900" />})
                setBusStopState(busStops)
            })
        })
        .catch((err) => (console.log(err)))
    }

    const [busStopState, setBusStopState] = useState(getStopData)
    const [dropdownState, setDropDownState] = useState("")
    const [busNumState, setBusNumState] = useState("")
    //Dropdrown controller for managing the dropdown value
    let controller;

    const handleDropDownChange = (item) =>{
        //If the drop down is cleared do not reset the text input
        if (!item.value){
            setDropDownState(item.value);
        }
        else if (item.value !== dropdownState){
            setDropDownState(item.value);
            setBusNumState("");
        }
    }

    const handleSubmit = () => {
        if (busNumState){
            //Make API call to server to get times from bus number
            getBusByNumber(busNumState.toUpperCase())
            .then((res) => {
                props.navigation.navigate('output', { times: res, input: busNumState, type: "bus" })
            })
            .catch((err) => console.log(err))
        }
        else if (dropdownState){
            //Make API call to server to get times from bus stop
            getBusByStop(dropdownState)
            .then((res) => {
                props.navigation.navigate('output', { times: res, input: dropdownState, type: "stop" })
            })
            .catch((err) => console.log(err))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Bus Information</Text>
            </View>
            <View style={styles.form}>
                <DropDownPicker
                    items={busStopState}
                    defaultValue={dropdownState}
                    controller={instance => controller = instance}
                    dropDownMaxHeight={190}
                    placeholder="Select a Stop"
                    containerStyle={styles.dropDownContainer}
                    style={styles.dropDown}
                    globalTextStyle={styles.dropDownText}
                    itemStyle={styles.dropDownItem}
                    labelStyle={styles.dropDownLabel}
                    onChangeItem={item => {handleDropDownChange(item)}}
                /> 
                <Text style={{fontSize: 16, padding: 10}}> or </Text>
                <TextInput
                    style={styles.busNumInput}
                    placeholder={"Bus Number"}
                    value={busNumState}
                    onChangeText={(val) => {setBusNumState(val); controller.reset()}}
                />
                <View style={styles.customButtonView}>
                    <CustomButton title="Submit" color="green" onPress={handleSubmit}/>
                </View>
            </View>
        </View>
    )
}