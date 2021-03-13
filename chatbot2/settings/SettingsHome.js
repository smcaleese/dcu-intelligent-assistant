import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Switch} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { langs } from '../utils/Languages'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    bg: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100
    },
    titleContainer: {
        backgroundColor: "#4269E1",
        width: "90%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
        marginTop: 50
    },
    titleText: {
        textAlign: 'center',
        fontSize: 24,
        color: "white"
    },
    optionContainer: {
        flex: 1,
        flexDirection: 'row',
        textAlignVertical: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: "#c3c3c3",
        padding: 2
    }

})

const SettingsHome = () => {

    //Get the languages for the dropdown items
    const getLangs = () => {
        const langList = []
        langs.forEach((lang) => {
            langList.push({label: lang.lang_name, value: lang.lang_code, icon: () => <Icon name="language" size={18} color="#000" />})
        })
        return langList
    }

    const [translationState, setTranslationState] = useState(true)
    const [dropDownData] = useState(getLangs())
    const [langaugeState, setLanguageState] = useState("auto")

    //Save the value to device storage
    const saveValue = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
        }
        catch (e) {
            console.error(e)
        }
    }

    //When language state chages save the value
    useEffect(() => {
        saveValue('@translationLang', langaugeState)
    },[langaugeState]);

    //When translation state cahnges save the value
    useEffect(() => {
        saveValue('@translationToggle', translationState)
    },[translationState]);

    //Switch logic
    const translationSwitchHandle = async () => {
        setTranslationState(!translationState)
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Settings</Text>
            </View>
            <View style={styles.bg}>
                <View style={{height: 300, width: "100%"}}>
                    <View style={styles.optionContainer}>
                        <Text>Translation</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={translationSwitchHandle}
                            value={translationState}
                            style={{height: 20, marginLeft: "60%"}}
                        />
                    </View>
                    <View style={styles.optionContainer }>
                        <Text>Translation Language</Text>
                        <DropDownPicker
                            items={dropDownData}
                            defaultValue={'auto'}
                            containerStyle={{height: 30, width: 100, marginLeft: "20%"}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            disabled={!translationState}
                            onChangeItem={(item) => {setLanguageState(item.value)}}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsHome
