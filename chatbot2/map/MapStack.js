import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapHome from './MapHome';
import CustomNavigationBar from '../components/CustomNavbar';


export default function MapStack({ navigation }) {
    const Stack = createStackNavigator()

    const [outputTitle, setOutputTitle] = useState('output')

    return (
        <Stack.Navigator
            screenOptions={{ header: (props) => <CustomNavigationBar {...props} outputTitle={outputTitle} /> }}>
                <Stack.Screen name="home">
                    {props => <MapHome {...props} setOutputTitle={setOutputTitle} /> }
                </Stack.Screen>
        </Stack.Navigator>
    )
}