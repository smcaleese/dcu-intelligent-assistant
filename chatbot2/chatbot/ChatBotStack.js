import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatBotHome from './ChatBotHome';
import TimetableOutput from '../timetable/TimetableOutput';
import CustomNavigationBar from '../components/CustomNavbar';
import MapHome from '../map/MapHome';
import TransportOutput from '../transport/TransportOutput';
import AssignmentsHome from '../assignments/AssignmentsHome';

const Stack = createStackNavigator()

export default function ChatBotStack() {
    const [outputTitle, setOutputTitle] = useState('output')

    return (
        <Stack.Navigator screenOptions={{ header: (props) => <CustomNavigationBar {...props} outputTitle={outputTitle}
            showFeedbackButton={true} /> }}>
            <Stack.Screen name="home">
                {props => 
                    <ChatBotHome {...props} setOutputTitle={setOutputTitle} />
                }
            </Stack.Screen>
            <Stack.Screen name="output">
                {props => 
                    <TimetableOutput {...props}/>
                }
            </Stack.Screen>
            <Stack.Screen name="map">
                {props => 
                        <MapHome {...props}  />
                }
            </Stack.Screen>
            <Stack.Screen name="bus">
                { props =>
                    <TransportOutput {...props} />
                }
            </Stack.Screen>
            <Stack.Screen name="assignments">
                { props =>
                    <AssignmentsHome {...props} />
                }
            </Stack.Screen>
        </Stack.Navigator>
    );
}
