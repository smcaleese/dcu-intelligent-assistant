import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './loginAndSignupStyle';
import CustomButton from '../components/CustomButton';
import { login, checkToken } from '../utils/Users';

function CustomInput(props) {
    return (
        <TextInput style={styles.input} placeholder={props.placeholder} value={props.value} 
            onChangeText={text => props.onChangeText(text)} secureTextEntry={props.secureTextEntry} />
    )
}

export default function LoginScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const autoLogin = async () => {
        // if the user has a JSON web token from a previous login in the past 24 hours, login automatically
        try {
            const token = await AsyncStorage.getItem("@token")
            const [tokenIsValid, email] = await checkToken(token)

            if(tokenIsValid) {
                console.log("token exists and is valid, logging in automatically")
                props.setEmail(email)
                await props.handleGetAssignments(email)
                props.setLoggedIn(true)
            }
            else {
                console.log("token no longer valid. User needs to log in again.")
            }
        } catch(err) {
            console.log("failed to retrieve JSON token:", err)
        }
    }

    useState(() => {
        if(props.allowAutoLogin) {
            autoLogin()
        }
    })

    const handleLogin = async () => {
        if(email.length === 0 || password.length === 0) {
            return
        }
        const [message, token] = await login(email, password)
        Alert.alert(message)

        if(message === "login successful") {
            props.setEmail(email)
            await AsyncStorage.setItem("@token", token)
            await props.handleGetAssignments(email)
            props.setLoggedIn(true)
            props.setAutoLogin(true)
        }
        else {
            goToSignup()
        }
    }

    const goToSignup = () => {
        props.navigation.navigate('signup')
    }

    return (
        <View style={styles.container}>
            <View style={styles.formBox}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Login</Text>
                </View>
                <View style={styles.form}>
                    <CustomInput placeholder="email" value={email} onChangeText={text => setEmail(text)} />
                    <CustomInput placeholder="password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} /> 
                    <View style={{margin: 10}}>
                        <CustomButton title="Submit" color="#4269E1" onPress={() => handleLogin()} />
                        <CustomButton title="Sign Up" color="#bbb" onPress={() => goToSignup()} />
                    </View>
                </View>
            </View>
        </View>
    )
}
