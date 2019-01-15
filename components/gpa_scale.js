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
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A1</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>1 - 1.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B2</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>2 - 2.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B3</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>3 - 3.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C4</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>4 - 4.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C5</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>5 - 5.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C6</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>6 - 6.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D7</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>7 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E8</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F9</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Nigeria" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 60.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 50.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>45 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 44.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "United States"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>90 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 89.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Benin"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>16 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>15 - 15.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 14.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>13 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 12.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>7 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 6.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Botswana"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Burkina Faso"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Algeria"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>15 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>13 - 14.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 12.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Angola"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>16 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>13 - 15.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 12.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>1 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cameroon" && option == "French System"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>15 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>13 - 14.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 12.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cameroon" && option == "University of Buea"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>55 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 54.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>45 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cameroon" && option == "Gce A Level"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Central African Republic"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Chad"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Congo"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>16 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 15.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Cote dIvoire"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Democratic Republic of Congo"){
            scaleBlock = (
                <React.Fragment>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>90 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 89.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Egypt" && option == "University Scale A"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>90 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 89.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>35 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 34.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Egypt" && option == "University Scale B"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>85 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 84.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>30 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Egypt" && option == "University Scale C"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>85 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 84.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>75 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 74.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>55 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>30 - 54.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Eritrea" ){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>75 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 74.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ethiopia" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ethiopia" && option == "Secondary Certificate"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>90 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 89.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Gabon" ){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ghana" && option == "Waec"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A1</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B2</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B3</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C4</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C5</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C6</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D7</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E8</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F9</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Ghana" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>75 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 74.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50- 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Guinea"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "Most Common"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 44.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "Certificate of Secondary School Education"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>75 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 74.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>55 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 54.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>45 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 44.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>35 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>30 - 34.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Kenya" && option == "Secondary Level"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>7 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>6 - 6.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>5 - 5.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>4 - 4.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>1 - 1.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Liberia" && option == "Most Common"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>90 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 89.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Liberia" && option == "Wassce"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A1</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>1 - 1.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B2</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>2 - 2.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B3</Text>    
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>3 - 3.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C4</Text>    
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>4 - 4.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C5</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>5 - 5.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C6</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>6 - 6.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C7</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>7 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E8</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F9</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Madagascar"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Mali"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Mauritania"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Morocco"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>15 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>13 - 14.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 12.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Mozambique"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>15 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 14.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Namibia" && option == "University"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0- 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Namibia" && option == "IGCSE"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A*</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>90 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 89.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>30 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>G</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>20 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>U</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0- 19.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Niger"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Senegal"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "South Africa"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>75 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 74.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Swaziland"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Togo"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>16 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 15.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Tunisia"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>14 - 20</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>12 - 13.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>11 - 11.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 10.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.1 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10 - 10.09</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9 - 9.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8 - 8.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 7.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Zimbabwe"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Rwanda" && option == "Scale 1"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>10.5 - 11</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9.5 - 10.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>8.5 - 9.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>7.5 - 8.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>6.5 - 7.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>5.5 - 6.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>4.5 - 5.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>3.5 - 4.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>1.5 - 3.49</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Rwanda" && option == "Scale 2"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>85 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>80 - 84.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>75 - 79.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>70 - 74.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>65 - 69.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>60 - 64.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>55 - 59.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>50 - 54.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>40 - 49.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Zambia" && option == "Scale 1"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>86 - 100</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>76 - 85.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>66 - 75.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>56 - 65.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>46 - 55.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C+</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>36 - 39.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>CP</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>30 - 35.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C-</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D+</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>E</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>0 - 29.99</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
                </View>
                </React.Fragment>
            )
        }
        else if (country == "Zambia" && option == "Secondary"){
            scaleBlock = (
                <React.Fragment>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>1 - 2</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>A</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>3 - 4</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>B</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>5 - 6</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>C</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>7 - 8</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>D</Text>
                </View>
                <View  style={{flex:1, flexDirection:'row', justifyContent:'space-around'}} >
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>9</Text>
                <Text style={{fontFamily:'AdventPro-Regular', fontSize:18}}>F</Text>
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