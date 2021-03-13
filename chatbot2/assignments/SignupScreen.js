import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import styles from './loginAndSignupStyle';
import CustomButton from '../components/CustomButton';
import { signup } from '../utils/Users';

function CustomInput(props) {
    return (
        <TextInput style={styles.input} placeholder={props.placeholder} value={props.value} 
            onChangeText={text => props.onChangeText(text)} secureTextEntry={props.secureTextEntry} />
    )
}

export default function SignupScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async () => {
        if(email.length === 0 || password.length === 0) {
            return
        } 
        const signupResponse = await signup(email, password)
        Alert.alert(signupResponse)

        if(signupResponse === "sign up successful") {
            props.setEmail(email)
            goToLogin()    
        }
    }

    const goToLogin = () => {
        props.navigation.navigate('login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.formBox}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Signup</Text>
                </View>
                <View style={styles.form}>
                    <CustomInput placeholder="email" value={email} onChangeText={text => setEmail(text)} />
                    <CustomInput placeholder="password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                    <View style={{margin: 10}}>
                        <CustomButton title="Submit" color="#4269E1" onPress={() => handleSignup()} />
                        <CustomButton title="Login" color="#bbb" onPress={() => goToLogin()} />
                    </View>
                </View>
            </View>
        </View>
    )
}