import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button,Input,Image } from '@rneui/base';
import {StatusBar} from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

function LoginScreen({navigation}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if(authUser) {
                navigation.replace("Home")
            }
        })
        return unsubcribe
    },[])

    const sinIn = () => {
        auth
         .signInWithEmailAndPassword(email,password)
         .catch((err) => alert(err))
    }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style='light'/> 
        <Image source={{
            uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/2048px-Facebook_Messenger_logo_2018.svg.png'
        }} style={{width:200,height:200}}/>
        <View style={styles.inputContainer}>
           <Input 
             value={email}
             onChangeText={(text) => setEmail(text)}
             placeholder='Email' autoFocus type='email'/>
           <Input
             value={password}
             onChangeText={(text) => setPassword(text)}
             placeholder='Mật khẩu'
             secureTextEntry type='password'/>
        </View>

        <Button containerStyle={styles.button} onPress={sinIn} title='Login'/>
        <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type='outline'  title='Register'/>
        <View style={{height:100}}/>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
  