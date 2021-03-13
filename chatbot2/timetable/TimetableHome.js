import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getClasses } from '../utils/GetClasses'
import CustomButton from '../components/CustomButton'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    form: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        width: '80%',
        justifyContent: 'center',
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
        fontSize: 24,
        color: "white"
    },
    courseCodeInput: {
        borderWidth: 1,
        paddingLeft: 10,
        width: '70%',
        margin: 20
    }
})

// source: https://github.com/react-native-datetimepicker/datetimepicker

export default function TimetableHome(props) {

    const [courseCode, setCourseCode] = useState('')
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    //Handle change in selected date
    const handleChange = (event, newDate) => {
        console.log(event, newDate)
        const userDate = newDate || date
        setShow(false)
        setDate(userDate)
        console.log("userDate:", userDate)
    }

    //Fetch data from getClasses util
    const submit = () => {
        if(courseCode.length === 0) {
            return
        }
        getClasses(courseCode, date)
        .then((res) => {
            props.navigation.navigate("output", { 
                classesData: res.classesData, 
                dayOfTheWeek: res.dayOfTheWeek, 
                jsDate: res.jsDate,
                courseCode: courseCode
            })
        })
        .catch((err) => {console.log(err)})
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Timetable</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.courseCodeInput}
                    placeholder={"Course code"}
                    value={courseCode}
                    onChangeText={newText => setCourseCode(newText)}
                />
                <CustomButton title="Choose Date" color="#4169e1" onPress={() => setShow(true)} />
                {show && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                />}
                <CustomButton title="Submit" color="green" onPress={submit} />
            </View>
        </View>
    )
}