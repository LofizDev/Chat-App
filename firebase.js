import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = { 
    apiKey : "AIzaSyClEVxWkdrirXYVGUpmoN-Rauzvr4XVADs" , 
    authDomain : "chat-app-9a186.firebaseapp.com" , 
    projectId : "chat-app-9a186" , 
    storageBucket : "chat-app-9a186.appspot.com" , 
    messagingSenderId : "632465017725" , 
    appId : "1:632465017725:web:0ff46c284b13512f53da14" 
  };

let app 

if(firebase.apps.length ===0) {
    app = firebase.initializeApp(firebaseConfig)
}else {
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export {db,auth}