import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import arrowImage from '../assets/arrow.png';
import { Delete } from 'react-native-feather';
import styles from './AssignmentsHomeStyle';

function CustomDropdown(props) {
    return (
        <TouchableOpacity style={[styles.dropdown, props.style]} activeOpacity={0.95} onPress={() => props.onPress()}>
            <Text style={styles.dropdownText}>{props.text}</Text>
            <Image source={arrowImage} style={styles.arrowImage} />
        </TouchableOpacity>
    )
}

export default function AssignmentsHome(props) {

    const [inputValue, setInputValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [showAssignmentDropDown, setShowAssignmentDropDown] = useState(true)
    const [showUserDropDown, setShowUserDropDown] = useState(false)

    let assignments = []
    // assignments from assignments page:
    if(typeof props.assignments !== "undefined") {
        assignments = props.assignments
    }
    // assignments from chatbot:
    else if(typeof props.route.params !== "undefined") {
        assignments = props.route.params.assignments
    }

    const onSubmitAssignment = async () => {
        if (inputValue.length > 0 && dateValue.length > 0) {
            await props.handleAddAssignment(props.email, inputValue, dateValue)
            await props.handleGetAssignments(props.email)
        }
    }

    const onDeleteAssignment = async (assignment) => {
        await props.handleDeleteAssignment(assignment)
        await props.handleGetAssignments(props.email)
    }

    const assignmentBoxes = assignments.map((assignment, index) => {

        let background
        if (index % 2 === 0) {
            background = "#EFEFEF"
        } else {
            background = "white"
        }

        return (
            <View style={[styles.assignmentBox, { backgroundColor: background }]} key={index}>
                <Text style={styles.assignmentText}>{assignment["date"]}, {assignment["name"]}</Text>
                <Delete height={30} width={30} stroke='#f00'
                    style={{margin: 10}} onPress={() => onDeleteAssignment(assignment)} />
            </View>
        )
    })

    const handleLogout = () => {
        props.setLoggedIn(false)
        props.setAutoLogin(false)
    }

    const onDeleteAccount = () => {
        props.onDeleteAccount()
    }

    return (
        // create custom dropdown component

        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>Assignments</Text>
            </View>
            <View style={styles.assignmentsContainer}>
                {assignmentBoxes}
            </View>
            <CustomDropdown text="Add Assignment" onPress={() => setShowAssignmentDropDown(state => !state)} />
            { showAssignmentDropDown &&
                <View style={styles.dropdownBox}>
                    <TextInput
                        style={[styles.textInput, {marginTop: 30}]}
                        onChangeText={text => setInputValue(text)}
                        value={inputValue}
                        placeholder="Assignment Name"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setDateValue(text)}
                        value={dateValue}
                        placeholder="Date"
                    />
                    <TouchableOpacity 
                        style={styles.customButton}
                        activeOpacity={0.9} onPress={() => onSubmitAssignment()}>
                        <Text style={styles.customButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            }
            <CustomDropdown text="User Settings" onPress={() => setShowUserDropDown(state => !state)} />
            { showUserDropDown &&
                <View style={[styles.dropdownBox, {marginBottom: 24}]}>
                    <TouchableOpacity style={[styles.customButton, styles.userDropDownButton, {marginTop: 24}]}
                        activeOpacity={0.9} onPress={() => handleLogout()}>
                        <Text style={styles.customButtonText}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.customButton, styles.userDropDownButton, {backgroundColor: '#FF5000'}]}
                        activeOpacity={0.9} onPress={() => onDeleteAccount()}>
                        <Text style={styles.customButtonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            }
        </ScrollView>
    )
}
