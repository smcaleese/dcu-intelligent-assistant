import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from '../components/CustomNavbar';
import TransportHome from './TransportHome';
import TransportOutput from './TransportOutput';

const Stack = createStackNavigator()

export default function TransportStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}>
            <Stack.Screen name="home">
                { props =>
                    <TransportHome {...props} />
                }
            </Stack.Screen>
            <Stack.Screen name="output">
                { props =>
                    <TransportOutput {...props} />
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}