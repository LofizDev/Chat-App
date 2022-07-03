import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base';
import {AntDesign,SimpleLineIcons } from '@expo/vector-icons'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { StatusBar } from 'expo-status-bar';
import firebase from "firebase/compat/app"
import { auth, db } from '../firebase';

const ChatScreen = ({ navigation, route }) => {
    const [input,setInput] = useState('')
    const [messages,setMessages] = useState([])
   useLayoutEffect(() => {
    navigation.setOptions({
        title:'Chat',
        headerBackTitleVisible:false,
        headerTitleAlign:"left",
        headerTitle: () => (
            <View style={{flexDirection:'row',alignItems:'center'}}>
               <Avatar 
                 source={{
                    uri:
                    messages[0]?.data?.photoURL ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png"}}
                 rounded/>
                 <Text style={{color:'black',marginLeft:10,fontWeight:'700'}}>{route.params.chatName}</Text>
            </View>
        ),
        headerLeft: () => (
            <TouchableOpacity style={{marginLeft:10}} onPress={navigation.goBack}>
                <AntDesign  name='arrowleft' size={24} color="blue"/>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <View style={{flexDirection:'row',justifyContent:'center',width:80,marginRight:20}}>
                <Icon name="phone" color="blue" size={24}/>
                <Icon style={{marginLeft:18}} name="video-camera" color="blue" size={24}/>
            </View>
        )
    })
   })

   const sendMessage =() => {
    db.collection('chats').doc(route.params.id).collection('message').add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        message:input,
        displayName:auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL:auth.currentUser.photoURL
    })
    setInput('')
   }

   useLayoutEffect(() => {
    const unsubscribe =
      db.collection('chats')
      .doc(route.params.id)
      .collection('message')
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot) => setMessages(
        snapshot.docs.map(doc => ({
            id:doc.id,
            data:doc.data()
        }))
      ))
      return unsubscribe
   },[route,messages])

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <StatusBar style='light'/>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : 'height'}
          style={styles.container}
          keyboardVerticalOffset={90}
        >
            <>
            <ScrollView contentContainerStyle={{paddingTop:20}}>
                {/* Chat goes here */}
                {messages.map(({id,data}) => 
                data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.reciever}>
                        <Avatar position="absolute" rounded 
                        bottom={-15} right={-5} size={30}
                        source={{uri:data.photoURL}}
                        />
                        <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                ): (
                    <View key={id} style={styles.sender}>
                         <Avatar position="absolute" rounded 
                        bottom={-15} left={-5} size={30}
                        source={{uri:data.photoURL}}
                        />
                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                )
                )}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput 
                   value={input}
                   placeholder="Soạn tin"
                   style={styles.textInput}
                   onChangeText={(text) => setInput(text)}/>
                
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.6}>
                    <Icon name='send' size={24} color="#2B68E6"/>
                </TouchableOpacity>

            </View>
            </>

        </KeyboardAvoidingView>
 
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    reciever: {
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:15,
        marginBottom:20,
        marginRight:10,
        maxWidth:'80%',
        position:'relative'
    },
    senderText: {
        color:'white',
        fontWeight:'500',
        fontSize:17,
        paddingBottom:5
    },
    senderName: {
        color:'white',
        fontSize:12
    },
    recieverText: {
        color:'black',
        fontWeight:'500',
        fontSize:17
        // marginLeft:10
    },
    recieverName: {
        fontSize:12
    },
    sender: {
        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'

    },
    footer: {
        flexDirection:'row',
        alignItems:'center',
        width:"100%",
        padding:15
    },
    textInput: {
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ECECEC',
        padding:10,
        color:'grey',
        borderRadius:30
    }
})