import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/themed'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [messages,setMessages] = useState([])
  useEffect(() => {
    const unsubscribe = db.collection("chats").doc(id).collection("messages").orderBy("timestamp","desc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
 
    return  unsubscribe
  })
  return (
        <ListItem key={id} onPress={() => enterChat(id,chatName) } bottomDivider>
             <Avatar rounded source={{
                uri:messages?.[0]?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrzOxql8AXdZppCwv7W8N9tfjtpNDDGc3liBfFG5RfgUZzBdhSsKxXgYCyofvpaMIv8lA&usqp=CAU'
             }}/>
             <ListItem.Content>
                <ListItem.Title style={{fontWeight:'800'}}>
                    {chatName}
                </ListItem.Title>
                {/* <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {messages?.[0]?.displayName} : {messages?.[0]?.message}
                </ListItem.Subtitle> */}
             </ListItem.Content>
        </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})