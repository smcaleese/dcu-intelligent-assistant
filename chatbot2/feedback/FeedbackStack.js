import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from '../components/CustomNavbar';
import FeedbackHome from './FeedbackHome';
import FeedbackOutput from './FeedbackOutput';

export default function FeedbackStack(props) {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ header: (props) => 
            <CustomNavigationBar {...props} title="Feedback" outputTitle="Feedback" /> }}>
                <Stack.Screen name="home">
                    { props => <FeedbackHome {...props} /> }
                </Stack.Screen>
                <Stack.Screen name="output">
                    { props => <FeedbackOutput {...props} /> }
                </Stack.Screen>
        </Stack.Navigator>
    )
}
