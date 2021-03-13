import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from '../components/CustomNavbar';
import TimetableHome from './TimetableHome';
import TimetableOutput from './TimetableOutput';

const Stack = createStackNavigator()

export default function TimetableStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}>
            <Stack.Screen name="home">
                { props =>
                    <TimetableHome {...props}/>
                }
            </Stack.Screen>
            <Stack.Screen name="output">
                { props =>
                    <TimetableOutput {...props}/>
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}