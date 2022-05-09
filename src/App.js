import React, { useEffect,useRef,useState } from 'react';
// import fire from './fire.js';
import Login from './Login.js';
import Hero from './Hero.js';
import './App.css';
import firebase from "firebase/compat/app"
// import {createUserWithEmailAndPassword, auth.onAuthStateChanged, auth.signInWithEmailAndPassword, auth.signOut} from "firebase/auth"
import "firebase/compat/auth"
import emailjs from "emailjs-com"


// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0YtD7UI0Ba09TZn6fnq2KcoKd5IhR094",
    authDomain: "decentralizedcloudservice.firebaseapp.com",
    databaseURL: "https://decentralizedcloudservice-default-rtdb.firebaseio.com",
    projectId: "decentralizedcloudservice",
    storageBucket: "decentralizedcloudservice.appspot.com",
    messagingSenderId: "974039200795",
    appId: "1:974039200795:web:6d66c8fac30aab81ddf4be",
    measurementId: "G-NX6M2YE568"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();

const App = () =>
{
    const [user, setUser]=useState('');
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailError, setEmailError]=useState('');
    const [passwordError, setPasswordError]=useState('');
    const [hasAccount, sethasAccount]=useState('');

    const clearInputs =()=>{
        setEmail('');
        setPassword('');
    }
    const clearErrors=()=>{
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin=()=>{
        clearErrors();
        
           auth.signInWithEmailAndPassword(email,password)
           .catch((err)=>{
               switch(err.code)
               {
                   case "auth/invalid-email":
                   case "auth/user-disabled":
                   case "auth/user-not-found":
                       setEmailError(err.message);
                       break;
                   case "auth/wrong-password":
                       setPasswordError(err.message); 
               }
           });
    };
    const handleSignup=(form)=>{
        clearErrors();
        auth.createUserWithEmailAndPassword(email,password)
        .then(() => {
            
            console.log("Yash")
            console.log(form)
    emailjs.sendForm('service_gd1wizd', 'template_mog5ay5', form, '9eUEArBlW4nkDbo5j')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
        })
        .catch((err)=>{
            switch(err.code)
            {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message); 
            }
        });

    };

    const handleLogout=()=>{
        auth.signOut();
    };

    const authListener=()=>{
        auth.onAuthStateChanged(user =>{
            if(user)
            {
                clearInputs();
                setUser(user);
            }
            else{
                setUser("");
            }
        });
    };

    useEffect(()=>{
        authListener();
    },[]);
    useEffect(()=>{
        console.log(user);
    },[user]);

    return(

        <>
        
        {user ? (
            <Hero handleLogout={handleLogout}/>
        ):(
            <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            sethasAccount={sethasAccount}
            emailError={emailError}
            passwordError={passwordError}
        />
        )}
        
        
        </>
    );

}
export default  App;