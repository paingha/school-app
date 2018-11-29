import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';


export default class GpaScale extends Component{
    constructor(props){
        super(props)
        this.state = {
            gpaCountry: 'United States',
            gpaOption: '',
        }
    }
    /*componentDidMount(){
        this.setState({gpaCountry: this.props.gpaCountry });
        this.setState({gpaOption: this.props.gpaOption });
    } */
    componentWillReceiveProps(nextProps){
        if(nextProps.gpaCountry !== this.props.gpaCountry){
          //Perform some operation
          this.setState({gpaCountry: nextProps.gpaCountry });
        }
        if(nextProps.gpaOption !== this.props.gpaOption){
            //Perform some operation
            this.setState({gpaOption: nextProps.gpaOption });
          }
      }

    render(){
        let country = this.state.gpaCountry;
        let option = this.state.gpaOption;
        let scaleBlock;
        if (country == "Nigeria" && option == "Waec"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A1</Text>
                <Text>1 - 1.99</Text>
                <Text>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B2</Text>
                <Text>2 - 2.99</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B3</Text>
                <Text>3 - 3.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C4</Text>
                <Text>4 - 4.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C5</Text>
                <Text>5 - 5.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C6</Text>
                <Text>6 - 6.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>D7</Text>
                <Text>7 - 7.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>E8</Text>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>F9</Text>
                <Text>9</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Nigeria" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>70 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>60 - 60.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>50 - 50.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>45 - 49.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>40 - 44.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 39.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "United States"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A</Text>
                <Text>90 - 100</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B</Text>
                <Text>80 - 89.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C</Text>
                <Text>70 - 79.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>D</Text>
                <Text>60 - 69.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>F</Text>
                <Text>0 - 59.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Benin"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A+</Text>
                <Text>16 - 20</Text>
                <Text>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A</Text>
                <Text>15 - 15.99</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A-</Text>
                <Text>14 - 14.99</Text>
                <Text>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B+</Text>
                <Text>13 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B</Text>
                <Text>12 - 12.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B-</Text>
                <Text>11 - 11.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C+</Text>
                <Text>10 - 10.99</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C</Text>
                <Text>9 - 9.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C-</Text>
                <Text>8 - 8.99</Text>
                <Text>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>D</Text>
                <Text>7 - 7.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>F</Text>
                <Text>0 - 6.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Botswana"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A</Text>
                <Text>80 - 100</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B</Text>
                <Text>70 - 79.99</Text>
                <Text>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C</Text>
                <Text>60 - 69.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>D</Text>
                <Text>50 - 59.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>E</Text>
                <Text>40 - 49.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>F</Text>
                <Text>0 - 39.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Burkina Faso"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Algeria"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>15 - 20</Text>
                <Text>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>13 - 14.99</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 12.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10 - 10.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 9.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Angola"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>16 - 20</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>13 - 15.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10 - 12.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>1 - 9.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cameroon" && option == "French System"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>15 - 20</Text>
                <Text>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>13 - 14.99</Text>
                <Text>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 12.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10 - 10.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 9.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cameroon" && option == "University of Buea"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A</Text>
                <Text>80 - 100</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B+</Text>
                <Text>70 - 79.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B</Text>
                <Text>60 - 69.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C+</Text>
                <Text>55 - 59.99</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C</Text>
                <Text>50 - 54.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>D+</Text>
                <Text>45 - 49.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cameroon" && option == "Gce A Level"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>A</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>B</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>C</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>D</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>E</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>F</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Central African Republic"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Chad"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Congo"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>16 - 20</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>14 - 15.99</Text>
                <Text>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cote dIvoire"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Democratic Republic of Congo"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>90 - 100</Text>
                <Text>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>80 - 89.99</Text>
                <Text>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>70 - 79.99</Text>
                <Text>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>60 - 69.99</Text>
                <Text>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>50 - 59.99</Text>
                <Text>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text>0 - 49.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Egypt" && option == "University Scale A"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>90 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>80 - 89.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>65 - 79.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>50 - 64.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>35 - 49.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 34.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Egypt" && option == "University Scale B"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>85 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>80 - 84.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>65 - 79.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>50 - 64.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>30 - 49.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 29.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Egypt" && option == "University Scale C"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>85 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>80 - 84.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>75 - 79.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>70 - 74.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B-</Text>
                <Text>65 - 69.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>60 - 64.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>55 - 59.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>30 - 54.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 29.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Eritrea" ){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>75 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>65 - 74.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>50 - 64.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>40 - 49.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 39.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ethiopia" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ethiopia" && option == "Secondary Certificate"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>90 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>80 - 89.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>60 - 79.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>50 - 59.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>0 - 49.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Gabon" ){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ghana" && option == "Waec"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A1</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B2</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B3</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C4</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C5</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C6</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D7</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E8</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F9</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ghana" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>80 - 100</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>75 - 79.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>65 - 74.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>60 - 64.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>50- 59.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 49.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Guinea"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "Most Common"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>70 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>65 - 69.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>60 - 64.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>50 - 59.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>40 - 44.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 39.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>70 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>60 - 69.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>50 - 59.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>40 - 49.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>0 - 39.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "Certificate of Secondary School Education"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>80 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>75 - 79.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>70 - 74.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>65 - 69.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B-</Text>
                <Text>60 - 64.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>55 - 59.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>50 - 54.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C-</Text>
                <Text>45 - 49.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D+</Text>
                <Text>40 - 44.99</Text>
                <Text>D+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>35 - 39.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D-</Text>
                <Text>30 - 34.99</Text>
                <Text>D-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0 - 29.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "Secondary Level"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>12</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>11 - 11.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>10 - 10.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>9 - 9.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B-</Text>
                <Text>8 - 8.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>7 - 7.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>6 - 6.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C-</Text>
                <Text>5 - 5.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D+</Text>
                <Text>4 - 4.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>1 - 1.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Liberia" && option == "Most Common"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>90 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>80 - 89.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>70 - 79.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>60 - 69.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 59.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Liberia" && option == "Wassce"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A1</Text>
                <Text>1 - 1.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B2</Text>
                <Text>2 - 2.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B3</Text>    
                <Text>3 - 3.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C4</Text>    
                <Text>4 - 4.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C5</Text>
                <Text>5 - 5.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C6</Text>
                <Text>6 - 6.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C7</Text>
                <Text>7 - 7.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E8</Text>
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F9</Text>
                <Text>9</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Madagascar"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Mali"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Mauritania"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Morocco"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>15 - 20</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>13 - 14.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 12.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Mozambique"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>15 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 14.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 11.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 9.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Namibia" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>80 - 100</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>70 - 79.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>60 - 69.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>50 - 59.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>0- 49.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Namibia" && option == "IGCSE"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A*</Text>
                <Text>90 - 100</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>80 - 89.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>70 - 79.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>60 - 69.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>50 - 59.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>40 - 49.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>F</Text>
                <Text>30 - 39.99</Text>
                <Text>D+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>G</Text>
                <Text>20 - 29.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>U</Text>
                <Text>0- 19.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Niger"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Senegal"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "South Africa"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>75 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>70 - 74.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>60 - 69.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>50 - 59.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 49.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Swaziland"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>C</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Togo"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>16 - 20</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 15.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 9.99</Text>
                <Text>D</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Tunisia"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>14 - 20</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>12 - 13.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>11 - 11.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.5 - 10.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10.1 - 10.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>10 - 10.09</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9 - 9.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>8 - 8.99</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>0 - 7.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Zimbabwe"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Rwanda" && option == "Scale 1"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>10.5 - 11</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>9.5 - 10.49</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>8.5 - 9.49</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>7.5 - 8.49</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B-</Text>
                <Text>6.5 - 7.49</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>5.5 - 6.49</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>4.5 - 5.49</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C-</Text>
                <Text>3.5 - 4.49</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>1.5 - 3.49</Text>
                <Text>D</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Rwanda" && option == "Scale 2"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>85 - 100</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A-</Text>
                <Text>80 - 84.99</Text>
                <Text>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>75 - 79.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>70 - 74.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B-</Text>
                <Text>65 - 69.99</Text>
                <Text>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>60 - 64.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>55 - 59.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C-</Text>
                <Text>50 - 54.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>40 - 49.99</Text>
                <Text>D</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Zambia" && option == "Scale 1"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A+</Text>
                <Text>86 - 100</Text>
                <Text>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>A</Text>
                <Text>76 - 85.99</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B+</Text>
                <Text>66 - 75.99</Text>
                <Text>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>B</Text>
                <Text>56 - 65.99</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C+</Text>
                <Text>46 - 55.99</Text>
                <Text>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>C</Text>
                <Text>36 - 39.99</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>CP</Text>
                <Text>30 - 35.99</Text>
                <Text>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D+</Text>
                <Text>0 - 29.99</Text>
                <Text>F</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>D</Text>
                <Text>0 - 29.99</Text>
                <Text>F</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>E</Text>
                <Text>0 - 29.99</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Zambia" && option == "Secondary"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>1 - 2</Text>
                <Text>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>3 - 4</Text>
                <Text>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>5 - 6</Text>
                <Text>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>7 - 8</Text>
                <Text>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text>9</Text>
                <Text>F</Text>
                </View>
                </React.Fragment>
            )
        }
        return(
        <View style={{flex:1, alignContent:'center', marginTop:10}}>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', textDecorationLine: 'underline'}}>
        { country == "Burkina Faso" || (country == "Angola") || (country == "Algeria") || (country == "Zambia" && option == "Secondary") || (country == "Zimbabwe") || (country == "Tunisia") || (country == "Togo") || (country == "Swaziland") || (country == "South Africa") || (country == "Senegal") || (country == "Niger") || (country == "Mozambique") || (country == "Morocco") || (country == "Mauritania") || (country == "Mali") || (country == "Madagascar") || (country == "Liberia" && option == "Most Common") || (country == "Guinea") || (country == "Ghana" && option == "Waec") || country == "Gabon" || (country == "Ethiopia" && option == "University") || (country == "Democratic Republic of Congo") || (country == "Cote dIvoire") || country == "Chad" || country == "Congo" || (country == "Central African Republic") || (country == "Cameroon" && option == "French System") || (country == "Cameroon" && option == "Gce A Level")?
        null
        :
        <Text style={{fontSize:16, fontWeight:'bold', color:"#085078"}}>Grade</Text>
        }
        <Text style={{fontSize:16, fontWeight:'bold', color:"#085078"}}>Scale</Text>
        <Text style={{fontSize:16, fontWeight:'bold', color:"#085078"}}>US Grade</Text>
        </View>
            {scaleBlock}
        </View>
        );
    }
}