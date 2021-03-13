import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    button: {
        width: '60%',
        margin: 10,
        borderRadius: 5,
        padding: 15,
        width: 200
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})


const CustomButton = (props) => {
    return (
        <TouchableOpacity style={[props.customStyle, styles.button, {backgroundColor: `${props.color}`}]}
            onPress={props.onPress} activeOpacity={0.95}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
