import React, { useState, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Menu } from 'react-native-feather';
import { appName } from '../config';

const styles = StyleSheet.create({
    AppBar: {
        color: 'white',
    },
    feedbackButton: {
        backgroundColor: '#7199ff',
        borderRadius: 4
    },
    feedbackButtonText: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 6,
        paddingLeft: 6,
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default function CustomNavigationBar(props) {
    const [visible, setVisible] = useState(false)
    const [showFeedbackButton, setFeedbackButtonVisible] = useState(false)
    const backgroundColor = '#4169e1'

    const openDrawer = () => {
        props.navigation.dispatch(DrawerActions.openDrawer())
    }

    const previous = props.previous

    let title = appName

    useEffect(() => {
        // custom title
        if(typeof props.title !== "undefined") {
            title = props.title
        }

        // custom outputTitle
        if(typeof props.outputTitle !== "undefined") {
            title = previous ? props.outputTitle : title
        }
        else {
            title = previous ? "Output" : title
        }

        // show feedback button
        if(typeof props.showFeedbackButton !== "undefined") {
            setFeedbackButtonVisible(props.showFeedbackButton)
        }
    }, [])

    const goToFeedback = () => {
        props.navigation.dispatch(DrawerActions.jumpTo('Feedback'))
    }

    return (
        <View>
            <Appbar.Header style={[styles.AppBar, {backgroundColor: backgroundColor }]}>
                {!previous ? (
                    <Appbar.Action icon={Menu} color="white" onPress={() => openDrawer()} />
                ) : null}
                {previous ? <Appbar.BackAction onPress={() => props.navigation.goBack()} /> : null}
                <Appbar.Content title={title} />
                <View>
                    {showFeedbackButton &&
                        <TouchableOpacity style={styles.feedbackButton} onPress={() => goToFeedback()} activeOpacity={0.8}>
                            <Text style={styles.feedbackButtonText}>Feedback</Text>
                        </TouchableOpacity>
                    }
                </View>
            </Appbar.Header>
        </View>
    )
}