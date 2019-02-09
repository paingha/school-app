import React from 'react'
import {AsyncStorage, StyleSheet, ImageBackground, ScrollView, View, Alert, Text, Image, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, KeyboardAvoidingView  } from 'react-native';
const { height } = Dimensions.get('window');
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dropdown } from 'react-native-material-dropdown';
import {getMajors, getCountries, updateUser, get_started} from '../settings'
import {getMajorsCall, getApplicantCountriesCall} from '../calls/misc'
import {updateUserCall, getStartedCall} from '../calls/user'
import RNPickerSelect from 'react-native-picker-select';

class FirstLoginScreen extends React.Component{
  static navigationOptions = {
    header: null
  };
    constructor(props){
        super(props)
        this.state = {
        screenHeight: height,
        visible: false,
        level: '',
        major: '',
        gpa: '',
        applicantCountry: '',
        scholarshipCountry: '',
        amount: '',
        criteria: '',
        token: ''
        }
      }
      onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
      };
      levelChange(value){
        this.setState({level: value})
      }
      majorChange(value){
        this.setState({major: value})
      }
      criteriaChange(value){
        this.setState({criteria: value})
      }
      amountChange(value){
        this.setState({amount: value})
      }
      gpaChange(value){
        this.setState({gpa: value}, ()=>{
          //alert(parseFloat(value))
        })
      }
      applicantCountryChange(value){
        this.setState({applicantCountry: value})
      }
      scholarshipCountryChange(value){
        this.setState({scholarshipCountry: value})
      }
    componentDidMount(){
        this.props.fetchMajors(getMajors)
        this.props.fetchCountries(getCountries)
        AsyncStorage.getItem('TOKEN', (err, result)=>{
          if (result){
            //get user here
            this.setState({token: result})
          }
        })
    }
    render(){
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 50;
    const deviceWidthinner = width - 40;
    const navWidth = ((width/3) - (10 + 10));
    const navHeight = (height/3) - 40;
    const scrollEnabled = this.state.screenHeight > height;
    const {token, major, applicantCountry, scholarshipCountry, gpa, criteria, level} = this.state;
    const {id, firstLogin} = this.props.currentUser;
    let levels = [{
        value: 'Graduate',
        label: 'Graduate',
      }, {
        value: 'Undergraduate',
        label: 'Undergraduate',
      }];
      let criterias = [{
        value: 'Merit',
        label: 'Merit',
      }, {
        value: 'Need',
        label: 'Need',
      }];
      let countries = this.props.countries;
      let scholarshipCountries = [{
        value: 'US',
        label: 'US',
      }, {
        value: 'Canada',
        label: 'Canada',
      }];
      let gpas = [{
        value: '2.0',
        label: '2.0',
      },{
        value: '2.1',
        label: '2.1',
      },{
        value: '2.2',
        label: '2.2',
      },{
        value: '2.3',
        label: '2.3',
      },{
        value: '2.4',
        label: '2.4',
      },{
        value: '2.5',
        label: '2.5',
      },{
        value: '2.6',
        label: '2.6',
      },{
        value: '2.7',
        label: '2.7',
      },{
        value: '2.8',
        label: '2.8',
      },{
        value: '2.9',
        label: '2.9',
      },{
        value: '3.0',
        label: '3.0',
      },{
        value: '3.1',
        label: '3.1',
      },{
        value: '3.2',
        label: '3.2',
      },{
        value: '3.3',
        label: '3.3',
      },{
        value: '3.4',
        label: '3.4',
      },{
        value: '3.5',
        label: '3.5',
      },{
        value: '3.6',
        label: '3.6',
      },{
        value: '3.7',
        label: '3.7',
      },{
        value: '3.8',
        label: '3.8',
      },{
        value: '3.9',
        label: '3.9',
      },{
        value: '4.0',
        label: '4.0',
      }];
      let majors = this.props.majors;
        return(
            <ScrollView 
            style={{flex:1}}
            contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            >
            <KeyboardAvoidingView style={{flexGrow:1}} behavior="padding" enabled>
          <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.mainContent}>
              <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <Text style={styles.title}>Get Started</Text>
            
            <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
            <RNPickerSelect
                    placeholder={{
                        label: 'Criteria',
                        value: null,
                        color: '#085078',
                    }}
                    items={criterias}
                    onValueChange={(value) => {
                      this.setState({criteria: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.criteria}
                />
            </View>
            <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
            <RNPickerSelect
                    placeholder={{
                        label: 'Level',
                        value: null,
                        color: '#085078',
                    }}
                    items={levels}
                    onValueChange={(value) => {
                      this.setState({level: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.level}
                />
            </View>
            <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
            <RNPickerSelect
                    placeholder={{
                        label: 'GPA',
                        value: null,
                        color: '#085078',
                    }}
                    items={gpas}
                    onValueChange={(value) => {
                      this.setState({gpa: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.gpa}
                />
            </View>
            <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
            {majors?
      <RNPickerSelect
                    placeholder={{
                        label: 'Major',
                        value: null,
                        color: '#085078',
                    }}
                    items={majors}
                    onValueChange={(value) => {
                      this.setState({major: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.major}
                    /*ref={(el) => {
                        this.inputRefs.picker = el;
                    }} */
                />
                :
                <RNPickerSelect
                    placeholder={{
                        label: 'Major',
                        value: null,
                        color: '#085078',
                    }}
                    items={[{'label': 'Loading...', 'key': 'Loading..'}]}
                    onValueChange={(value) => {
                      this.setState({major: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.major}
                    /*ref={(el) => {
                        this.inputRefs.picker = el;
                    }} */
                />
                  }
            </View>
            
            <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Scholarship Country',
                        value: null,
                        color: '#085078',
                    }}
                    items={scholarshipCountries}
                    onValueChange={(value) => {
                      this.setState({scholarshipCountry: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.scholarshipCountry}
                />
            </View>
            <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
            {countries?
      <RNPickerSelect
                    placeholder={{
                        label: 'Applicant Country',
                        value: null,
                        color: '#085078',
                    }}
                    items={countries}
                    onValueChange={(value) => {
                      this.setState({applicantCountry: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.applicantCountry}
                    /*ref={(el) => {
                        this.inputRefs.picker = el;
                    }} */
                />
                :
                <RNPickerSelect
                    placeholder={{
                        label: 'Applicant Country',
                        value: null,
                        color: '#085078',
                    }}
                    items={[{'label': 'Loading...', 'key': 'Loading..'}]}
                    onValueChange={(value) => {
                      this.setState({applicantCountry: value})
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.applicantCountry}
                    /*ref={(el) => {
                        this.inputRefs.picker = el;
                    }} */
                />
                  }
            </View>
            <TouchableHighlight
              onPress={()=> {
                this.setState({visible: true}, ()=>{
                  setTimeout(()=>{
                  this.setState({visible: false})
                  let e = this.props.navigation;
                  this.props.getStarted(get_started, token, id, major, applicantCountry, scholarshipCountry, gpa, criteria, level, firstLogin, e)
                  },3000)
                })
              }
            }
               style={{alignItems: 'center', height: 60, marginBottom: 0, width: deviceWidth, elevation: 3, backgroundColor: '#FFBF71', paddingBottom: 8, paddingTop: 16}}
              >
               <Text style={{fontSize: 20, color: 'white'}}> Get Started </Text>
              </TouchableHighlight>
              <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
    
              </ImageBackground>
              </KeyboardAvoidingView>
              </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#86e2d5',
  },
  logo: {
    width: 80,
    height: 105,
    marginBottom: 15,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 3,
    marginTop: -10,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: '#085078',
      borderRadius: 4,
      backgroundColor: 'white',
      color: '#085078',
  },
  inputAndroid: {
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: '#085078',
      borderRadius: 4,
      backgroundColor: 'white',
      color: '#085078',
  },
});

function mapper(state) {
    return {
        majors: state.major.data,
        countries: state.country.data,
        currentUser: state.user.data,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchMajors: (url) => 
        {
          dispatch(
            getMajorsCall(url)
          );
        },
        getStarted: (url, token, user_id, major, applicantCountry, scholarshipCountry, gpa, criteria, level, firstLogin, nav) =>
        {
          dispatch(
            getStartedCall(url, token, user_id, major, applicantCountry, scholarshipCountry, gpa, criteria, level, firstLogin, nav)
          )
        },
        fetchCountries: (url) => 
        {
          dispatch(
            getApplicantCountriesCall(url)
          );
        },
    };
  };
  
  export default connect(mapper, mapDispatchToProps)(FirstLoginScreen);