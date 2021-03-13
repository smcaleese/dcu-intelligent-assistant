import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    formBox: {
        marginTop: 40,
        width: '85%',
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: "#4269E1",
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        padding: 5,
        fontWeight: 'bold'
    },
    form: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center'
    },
    button: {
        margin: 16,
        width: '80%',
        textAlign: 'center'
    },
    input: {
        width: '80%',
        borderWidth: 1,
        margin: 20,
        borderRadius: 5,
        borderColor: 'gray',
        paddingLeft: 20
    }
})