import React, { useState, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, NativeModules } from 'react-native';
import { Send } from 'react-native-feather';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { TranslateText } from '../utils/Translate';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { awsRegion, awsIdentityPool, lexBotName } from '../config';
import uuid from 'react-native-uuid';
import { welcomeMessage } from '../config'

//Developed using https://medium.com/@itsHabib/integrate-an-amazon-lex-chatbot-into-a-react-native-app-1536883ccbed as a guide

//AWS Config
AWS.config.region = awsRegion
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsIdentityPool,
})

//ChatBot Config
const botName = lexBotName
const lexChatBot = new AWS.LexRuntime()

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    messagesBox: {
        flex: 1,
        marginTop: 20,
    },
    messages: {
        padding: 10,
        borderRadius: 18,
    },
    botMessages: {
        backgroundColor: '#c2c2c2',
        color: 'black',
        marginLeft: 16
    },
    userMessages: {
        backgroundColor: '#4169e1',
        color: 'white',
        marginRight: 16
    },
    messageContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 8
    },
    userContainer: {
        justifyContent: 'flex-end',
    },
    botContainer: {
        justifyContent: 'flex-start',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#dde',
        marginTop: 10
    },
    textInput: {
        flex: 1,
        padding: 16,
        fontSize: 16,
    },
    sendButton: {
        height: 60,
        width: 60,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
    },
    ViewOutputButton: {
        margin: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 30,
        width: '50%'
    },
    ViewOutputButtonText: {
        textAlign: 'center',
        padding: 8,
        color: 'black',
        fontSize: 16
    }
})

function ViewOutputButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.ViewOutputButton}>
            <Text style={styles.ViewOutputButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

function SendButton(props) {
    return (
        <TouchableOpacity style={styles.sendButton} onPress={props.onPress}>
            <Send stroke="#000" />
        </TouchableOpacity>
    )
}

export default function CustomChatBot(props) {
    const [userInputState, setUserInputState] = useState('')
    const [messagesState, setMessagesState] = useState([{ text: welcomeMessage, from: "bot" }])
    const [translateToggle, setTranslateToggle] = useState(false)
    const [userLangPref, setUserLangPref] = useState('en')
    const [userID, setUserID] = useState(uuid.v4())

    //Words to ignore translation
    const wordsToIgnore = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

    //Get a value from device storage (Settings)
    const getValue = async (key) => {
        try {
            const settingsValue =  await AsyncStorage.getItem(key)
            return settingsValue != null ? JSON.parse(settingsValue) : null;
        }
        catch (e) {
            console.error(e)
        }
    }

    //When the screen is focused update the settings
    useFocusEffect(
        useCallback(() => {
            getValue('@translationLang').then((data) => setUserLangPref(data))
            getValue('@translationToggle').then((data) => setTranslateToggle(data))
        }, [])
    )

    //Function to determine wether or not translation should occur
    const dontTranslate = () => {
        const words = userInputState.split(" ")

        if(words.length < 2) {
            return true
        }
        for(let i = 0; i < words.length; i++) {
            if(wordsToIgnore.includes(words[i].toLowerCase())) {
                return true
            }
        }
        return false
    }

    //Translation handler
    const handleTranslate = (text, targetLang='en', sourceLang='auto') => {
        return new Promise((resolve, reject) => {
            TranslateText(text, targetLang, sourceLang)
            .then((res) => {
                resolve([res.TranslatedText, res.SourceLanguageCode]);
                })
            .catch((err) => {reject(err)})
        })
    }

    const setUserMessage = (value) => {
        setMessagesState(messagesState => [...messagesState, { text: value, from: "user" }])
    }

    const setBotMessage = (value) => {
        setMessagesState(messagesState => [...messagesState, { text: value, from: "bot" }])
    }

    //Handle Send
    const handleSendMessage = async (userInputText) => {

        let messageText = userInputText
        let userLang = userLangPref

        //Translation user input if it isn't one word
        if (translateToggle && dontTranslate() === false) {
            await handleTranslate(userInputText)
            .then((translationRes) => {
                messageText = translationRes[0]
                userLang = translationRes[1]
            })
            .catch((err) => console.log(err))
        }

        console.log("messageText:", messageText)
        setUserMessage(userInputText)

        //Message format for Amazon Lex SDK
        const message = {
            botAlias: '$LATEST',
            botName: botName,
            inputText: messageText,
            userId: userID
        }

        //Lex response processing
        lexChatBot.postText(message, async (err, data) => {
            if(err) {
                console.log(err)
            }
            if(data) {
                setTimeout(async () =>
                {
                    //Translate the bot response if the user input is two words or more
                    if (translateToggle && dontTranslate() === false) {
                        console.log("current user message:", userInputState)
                        await handleTranslate(data.message, userLang)
                        .then((res) =>{
                            setBotMessage(res[0])
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                    else {
                        console.log("didn't translate")
                        setBotMessage(data.message)
                    }
                }
                , 500)
                //If the Lex bot has fulfilled a request pass the data retrieved up to the chatbot home
                if(data.dialogState === "Fulfilled") {
                    console.log("data:", data)
                    props.handleComplete(err, data)
                }
            }
        })

    }

    const handleSubmit = () => {
        if(userInputState === '') {
            return
        }
        handleSendMessage(userInputState)
        setUserInputState('')
    }

    //List of messages displayed on screen
    const messages = messagesState.map((item, index) => {
        let specificStyle, specificContainer

        if (item.from === "bot") {
            specificStyle = styles.botMessages
            specificContainer = styles.botContainer
        }
        else if(item.from === "user") {
            specificStyle = styles.userMessages
            specificContainer = styles.userContainer
        }
        return (
            <View style={[styles.messageContainer, specificContainer]} key={index}>
                <Text style={[styles.messages, specificStyle]}>{item.text}</Text>
            </View>
        )
    })

    const scrollRef = useRef()

    return (
        <View style={styles.container}>
            <ScrollView style={styles.messagesBox} ref={scrollRef}
                onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}>
                { messages }
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setUserInputState(text)}
                    value={userInputState}
                    placeholder={'Type here to talk'}
                    autoFocus={true}
                />
                <View>
                    <SendButton onPress={handleSubmit} />
                </View>
            </View>
            <View>
                <ViewOutputButton
                    title="View Previous Output"
                    onPress={props.goToOutput}
                />
            </View>
        </View>
    )
}
