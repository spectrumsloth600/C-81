import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
            confirmPassowrd:'',
            isModalVisible:false,
            firstName:'',
            lastName:'',
            address:'',
            contact:''
            
        }
    }

    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
          this.props.navigation.navigate('Donate')

        })
        .catch((error)=>{
            var errorcode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    userSignUp = (emailId, password, confirmPassword) =>{
        if(password!==confirmPassword){
            return Alert.alert("Passwords do not match recheck your password")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection('users').add({
                first_Name:this.state.firstName,
                last_Name:this.state.lastName,
                contact:this.state.contact,
                address:this.state.contact,
                email_Id:this.state.emailId
            })
            return Alert.alert('User added successfully','',[
            {   text:'Ok', onPress:()=>this.setState({'isModalVisible':false})},
            ]
            );
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);

        });
    }
}

    render(){
        return(
            <View style={styles.container}>
                <View styles={styles.profileContainer}>
                    <SantaAnimation/>
                    <Text style={styles.buttonContainer}>Welcome to Book Santa</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput 
                    style={styles.loginBox}
                    placeholder="example@gmail.com"
                    plaveholderTextColor = "black"
                    keboardType = "email-address"
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}>

                    </TextInput>

                    <TextInput
                    style={style.loginBox}
                    secureTextEntry = {true}
                    placeholder="password"
                    placeholderTextColor = "black"
                    onChangeText={(text)=>{
                        this.setState({
                            password: text
                        })
                    }}>

                    </TextInput>
                    <TouchableOpacity
                    style={[styles.button,{marginBottom:20,marginTop:20}]}
                    onPress = {()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                        <Text style={styles.buttonText}>login here</Text>
                    </TouchableOpacity>
                    <TouchableOpactiy
                    style={styles.button}
                    onPress={()=>{this.userSignUp(this.state.emailId,this.state.password)}}
                    >
                        <Text style={styles.buttonText}>Sign up here</Text>
                    </TouchableOpactiy>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F8BE85'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10,
      paddingLeft:10
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    }
  })
