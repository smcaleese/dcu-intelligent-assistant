import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ClassInfoDropdown from '../components/ClassInfoDropdown';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10
    },
    noClassesText: {
        textAlign: 'center',
        margin: 20
    },
    dateText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 16
    }
});

export default function TimetableOutput(props) {

    const params = props.route.params
    const classesData = params.classesData

    const getHour = (time) => {
        return new Date(time).getHours()
    }

    //If there are classes for the course returned
    if (Array.isArray(classesData) && classesData.length > 0) {
        const jsDate = new Date(params.jsDate.split('T')[0])

        if(jsDate !== null && jsDate !== '') {
            var formattedDate = jsDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
        }

        // order classes by start time
        const sortedClassData = classesData.sort((a, b) => getHour(a.StartDateTime) < getHour(b.StartDateTime) ? -1 : 1)

        const classesInformation = sortedClassData.map((dataPoint, index) =>
            <ClassInfoDropdown
                key={index}
                description={dataPoint.Description}
                Name={dataPoint.Name}
                EventType={dataPoint.EventType}
                Location={dataPoint.Location}
                startTime={getHour(dataPoint.StartDateTime) + ":00"}
                endTime={getHour(dataPoint.EndDateTime) + ":00"}
            />
        )
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>{params.courseCode.toUpperCase()}, {params.dayOfTheWeek}, {formattedDate}</Text>
                <ScrollView>
                    {classesInformation}
                </ScrollView>
            </View>
        )
    }
    else {
        let message = ''
        if (classesData === "no data") {
            message = "no data"
        }
        else if (classesData === "loading") {
            message = "loading..."
        }
        else if (Array.isArray(classesData) && classesData.length === 0) {
            message = "No classes today!"
        }
        else if (classesData === "NA") {
            message = "Error. Please try again."
        }
        else if(classesData === "invalid date") {
            message = "Invalid date. Please try again."
        }
        else if(classesData === undefined) {
            message = "Invalid Course Code. Please try again."
        } else {
            message = "Error"
        }
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <Text style={styles.noClassesText}>{message}</Text>
            </View>
        )
    }
}