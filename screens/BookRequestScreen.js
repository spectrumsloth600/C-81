import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
    constructor(){
        super();
        this.state ={
            userId : firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:""
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }



    addRequest =(bookName,reasonToRequest)=>{
        var userId = this,createUniqueId
        var randomRequestId = this.createUniqueId()
        db.collection('requested_books').add({
            "user_id": userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id" : randomRequestId,
        })
        this.setState({
            bookName :'',
            reasonToRequest:'',
        })


        return Alert.alert("Book request issued successfully")
    }


    render(){
        return(
            <View style={{flex:1}}>
                <Myheader title="Request Book"/>
                <KeyboardAvoidingView style={StyleSheet.keyBoardStyle}>
                    <TextInput
                    style={StyleSheet.formTextInput}
                    placeholder={"Enter book name"}
                    OnChangeText={(text)=>{
                        this.setState({
                            BookName:text
                        })
                    }}
                    value={this.state.bookName}
                    />
                </KeyboardAvoidingView>
            </View>
        )
    }
}