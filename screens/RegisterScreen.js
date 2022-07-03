import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button,Input,Image } from '@rneui/base';
import {StatusBar} from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

function RegisterScreen({navigation}) {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [imageUrl,setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:'Trở về trang đăng nhập'
        })
    },[navigation])

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName:name,
                photoURL:
                  imageUrl || 'https://st3.depositphotos.com/1767687/16607/v/950/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg?forcejpeg=true'
            })
        })
        .catch((err) => alert(err.message))
    }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style='light'/> 
        <Text h3 style={{marginBottom:50,fontSize:27}}>
           Tạo tài khoản
        </Text>
        <View style={styles.inputContainer}>
           <Input 
             value={name}
             onChangeText={(text) => setName(text)}
             placeholder='Họ Tên' autoFocus type='text'/>
           <Input
             value={email}
             onChangeText={(text) => setEmail(text)}
             placeholder='Email'
              />
            <Input
             value={password}
             onChangeText={(text) => setPassword(text)}
             placeholder='Mật khẩu'
             secureTextEntry type='password'/>
            <Input
             value={imageUrl}
             onChangeText={(text) => setImageUrl(text)}
             placeholder='Ảnh đại diện'
              onSubmitEditing={register}/>
        </View>

        <Button raised onPress={register}
         containerStyle={styles.button}
         title='Register'/>
        <View style={{height:100}}/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer: {
        width:300
    },
    button: {
        width:200,
        marginTop:10

    }
  });
  