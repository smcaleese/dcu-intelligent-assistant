import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatBotStack from './chatbot/ChatBotStack';
import MapStack from './map/MapStack';
import TimeTableStack from './timetable/TimetableStack';
import TransportStack from './transport/TransportStack';
import AssignmentsStack from './assignments/AssignmentsStack';
import SettingsStack from './settings/SettingsStack';
import FeedbackStack from './feedback/FeedbackStack';

export default class App extends Component {
    render() {
        const Drawer = createDrawerNavigator()

        return (
            <PaperProvider>
                <NavigationContainer>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Assistant" component={ChatBotStack} />
                        <Drawer.Screen name="Timetable" component={TimeTableStack} />
                        <Drawer.Screen name="Map" component={MapStack} />
                        <Drawer.Screen name="Assignments" component={AssignmentsStack} />
                        <Drawer.Screen name="Transport" component={TransportStack} />
                        <Drawer.Screen name="Settings" component={SettingsStack} />
                        <Drawer.Screen name="Feedback" component={FeedbackStack} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </PaperProvider>
        )
    }
}