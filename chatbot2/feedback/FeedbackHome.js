import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { googleFormsFeedbackURL } from '../config'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    form: {
        marginTop: 30,
        backgroundColor: 'white',
        width: '85%',
        height: '85%',
        alignItems: 'center'
    },
    linkButton: {
        marginTop: 50,
        backgroundColor: 'green',
        width: '50%',
        borderRadius: 10
    },
    linkButtonText: {
        padding: 15,
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
})

function LinkButton(props) {
    const openURL = async () => {
        await Linking.openURL(props.url)
    }

    return (
        <TouchableOpacity style={styles.linkButton} onPress={() => openURL()} activeOpacity={0.8}>
            <Text style={styles.linkButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default function FeedbackHome(props) {

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <LinkButton title="Open Link to Feedback Form" url={googleFormsFeedbackURL} />
            </View>
        </View>
    )
}
