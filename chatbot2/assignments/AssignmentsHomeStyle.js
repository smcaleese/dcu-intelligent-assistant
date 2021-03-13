import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DEDEDE',
        /*alignItems: 'center'*/
    },
    titleBox: {
        marginTop: 24,
        backgroundColor: 'white',
        width: '80%'
    },
    titleText: {
        fontSize: 20,
        padding: 16,
        textAlign: 'center'
    },
    assignmentsContainer: {
        width: '80%',
        alignItems: 'flex-end',
        backgroundColor: '#4169e1'
    },
    assignmentBox: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    assignmentText: {
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        textAlign: 'center'
    },
    dropdown: {
        width: '80%',
        backgroundColor: '#4269E1',
        borderRadius: 5,
        marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdownText: {
        padding: 16,
        fontSize: 16,
        color: 'white',
        flex: 1,
        textAlign: 'center'
    },
    arrowImage: {
        height: 30,
        width: 30,
        margin: 16
    },
    dropdownBox: {
        backgroundColor: 'white',
        width: '80%',
        alignItems: 'center'
    },
    textInputTitle: {
        padding: 16
    },
    textInput: {
        margin: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 15,
        width: '80%',
        backgroundColor: 'white'
    },
    customButton: {
        borderRadius: 5,
        margin: 10,
        marginBottom: 20, 
        backgroundColor: '#4269E1', 
        paddingLeft: 10, 
        paddingRight: 10
    },
    userDropDownButton: { 
        width: 160
    },
    customButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 16
    }
})