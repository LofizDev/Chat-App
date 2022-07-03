import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button,Input,Image,Avatar } from '@rneui/base';
import { db } from '../firebase';
const AddChatScreen = ({ navigation }) => {
    const [input,setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Thêm phòng chat',
            headerBackTitle:'Chats'
        })
    },[navigation])

    const createChat =  async () => {
       await db
         .collection('chats')
         .add({
            chatName:input
         })
         .then(() => {
            navigation.goBack()
         })
         .catch((err) => alert(err))
    }
  return (
    <View style={styles.container}>
      <Input 
         placeholder='Nhập tên phòng'
         onSubmitEditing={createChat}
         value={input} onChangeText={(text) => setInput(text)}
         leftIcon={
            <Icon name='wechat' type='antdesign' size={24} color='black'/>
         }
         />
         <Button onPress={createChat} title='Tạo phòng chat mới'/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({})