import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Avatar } from '@rneui/base';

import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItem from '../components/CustomListItem';
import { TouchableOpacity } from 'react-native';
import {AntDesign } from '@expo/vector-icons'
import { auth , db } from '../firebase';
function HomeScreen({navigation}) {
    const [chats,setChats] = useState([])

    const logout = () =>  {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }
    // get all Chats room
    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => 
        setChats(
            snapshot.docs.map((doc) => ({
                id:doc.id,
                data:doc.data()
            }))
        ))
        return unsubscribe
    },[])

  
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Messager",
            headerStyle: {backgroundColor:'#fff'},
            headerTitleStyle: {color:'black'},
            headerTintColor:'black',
            headerLeft:() => (
                <View style={{marginLeft:30}}>
                   <Avatar onPress={logout}  rounded  style={{width:24,height:24}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png' }}/>
                </View>
            ),
            headerRight:() => (
                <View style={{flexDirection:'row',justifyContent:'space-between',width:80,marginRight:20}}>
                  <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name='camerao' size={24} color='black'/>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name='message1' onPress={() => navigation.navigate('AddChat')} size={24} color='black'/>
                  </TouchableOpacity>
                </View>
            ),
        })
    },[])


  // Get Detail chat
  const enterChat = (id,chatName) => {
    navigation.navigate("Chat", {
        id,
        chatName
    })
}
  return (
   <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id,data:{chatName}}) => (
            <CustomListItem key={id} id={id} enterChat={enterChat} chatName={chatName}/>
        ))}
      </ScrollView>
   </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
       height:'100%'
    },
    inputContainer: {
        width:300
    },
    button: {
        width:200,
        marginTop:10
    }
  });
  