import React, { useState } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from '../components/CustomNavbar';
import AssignmentsHome from './AssignmentsHome';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import { getAssignments, addAssignment, deleteAssignment } from '../utils/Assignments';
import { apiURL } from '../config'
import { deleteAccount } from '../utils/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AssignmentsStack() {

    const Stack = createStackNavigator()

    const [email, setEmail] = useState('')
    const [assignments, setAssignments] = useState([])  
    const [loggedIn, setLoggedIn] = useState(false)
    const [allowAutoLogin, setAutoLogin] = useState(true)

    const handleGetAssignments = async (email) => {
        const assignments = await getAssignments(email)
        console.log("assignments:", assignments)
        setAssignments(assignments)
    }

    const handleAddAssignment = async (email, inputValue, date) => {
        await addAssignment(email, inputValue, date)
    } 

    const handleDeleteAssignment = async (assignment) => {
        await deleteAssignment(assignment)
    }

    const onDeleteAccount = async () => {
        const message = await deleteAccount(email)
        Alert.alert(message)
        if(message === "account successfully deleted") {
            await AsyncStorage.removeItem("@email")   
            await AsyncStorage.removeItem("@token")
            setEmail('')
            setAutoLogin(false)
            setLoggedIn(false)
        }
    }

    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomNavigationBar {...props} previous={false} /> }}>
            {loggedIn ?
            <Stack.Screen name="home">
                {props =>
                    <AssignmentsHome
                        {...props}
                        email={email}
                        setLoggedIn={setLoggedIn}
                        setAutoLogin={setAutoLogin}
                        assignments={assignments}
                        handleGetAssignments={handleGetAssignments}
                        handleAddAssignment={handleAddAssignment}
                        handleDeleteAssignment={handleDeleteAssignment}
                        onDeleteAccount={onDeleteAccount}
                    />
                }
            </Stack.Screen>
            :
            <Stack.Screen name="login">
                {props => 
                    <LoginScreen 
                        {...props}
                        apiURL={apiURL}
                        setEmail={setEmail}
                        setLoggedIn={setLoggedIn}
                        allowAutoLogin={allowAutoLogin}
                        setAutoLogin={setAutoLogin}
                        handleGetAssignments={handleGetAssignments}
                    />
                }
            </Stack.Screen>
            }
            <Stack.Screen name="signup">
                {props => 
                    <SignupScreen 
                        {...props}
                        apiURL={apiURL}
                        setEmail={setEmail}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}