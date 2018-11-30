import React from 'react';
import { StyleSheet, View, Text, StatusBar, AsyncStorage, FlatList, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Loader extends React.Component{
    render(){
        return(
            <Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
        )
    }
}