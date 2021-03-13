import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from '../components/CustomNavbar';
import SettingsHome from './SettingsHome';

const Stack = createStackNavigator()

export default function TransportStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}>
            <Stack.Screen name="home">
                { props =>
                    <SettingsHome {...props} />
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}