import React from 'react';
import { StyleSheet, FlatList, Clipboard,
  ToastAndroid,
  AlertIOS,
  ActivityIndicator,
  Platform, View, Alert, Text, StatusBar, Linking, AsyncStorage, ScrollView, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';
import {getStates, getCountries, gpa_search, singleGpa} from '../settings'
import {getStatesCall, getApplicantCountriesCall} from '../calls/misc'
import {gpaSearchCall, singleGpaCall, clearGpaCall} from '../calls/gpaSchool'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Dropdown } from 'react-native-material-dropdown';
import Share, {ShareSheet, Button} from 'react-native-share';
const { height } = Dimensions.get('window');

class NewForumScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      states: null,
      shows: false,
      token: '',
      loadMore: false,
      screenHeight: height,
      loading: true,
      topic: '',
      content: ''
    }
    this.offset = 0;
  }
    static navigationOptions = ({ navigation }) =>{
      return {
        title: 'New Forum Post',
        headerStyle: {
          backgroundColor: '#085078',
          textAlign: 'center',
        },
        headerLeft: (
          <Icon
            name="bars"
            size={30}
            onPress={()=> {
              let e = navigation;
              //onSignOut(e)
              navigation.openDrawer();
              //navigation.navigate('Drawer')
            }}        
            style={{
              marginLeft: 15, 
              paddingRight: 15,
              color:'#ffffff'
            }}
            />),
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '200',
          fontFamily: 'AdventPro-Bold',
          textAlign: 'center'
        },
      }
      };
      onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
      };
      
  async componentDidMount(){
    await AsyncStorage.getItem('TOKEN', (err, result)=>{
      if (result){
        //get user here
        this.setState({token: result})
      }
    })
  
  
  };
  submitPost = () => {
      const {topic, content, token} = this.state;
      const {id} = this.props.currentUser;
      let by = id;
    fetch(`https://www.theacademist.com/api/v1/forum`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
        mode: 'cors',
        body: JSON.stringify({topic, content, by})
    })
        .then(response=>response.json())
        .then(json=>{
        if (json.error)
        throw new Error(json.error.message);
        this.setState({topic:'', content:''},()=>{
            Alert.alert(
                'Success!',
                'Forum Post Created Successfully'
            )
        })
        
        //alert(json.token);
        })
        .catch(error=>{
            Alert.alert(
                'Error!',
                'An error occured, Try Again'
            )
        });
        
  }
  render() {
    const {id, firstName, lastName, coin, major, image, referralCode, referralToken, scholarshipCountry, gpa, applicantCountry, savedID, saved, criteria, level} = this.props.currentUser;
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    
    const scrollEnabled = this.state.screenHeight < 100;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 200;
    const deviceWidthinner = width - 40;
    const navWidth = ((width/3) - (10 + 10));
    const navHeight = (height/3) - 40;
    const BContent = <Icon style={[styles.btn, styles.btnModal]} name='close' size={30} color="#085078" />;
    
    
    return (
        <ScrollView 
        style={{flex:1}}
        contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
        >
    <React.Fragment>
    <View style={styles.mainContent}>
    <StatusBar
        barStyle="light-content"
        backgroundColor="#085078"
        />
        <View style={{flex:1, width:'90%', marginBottom:5, marginTop:10, paddingTop: 20, backgroundColor:'white', alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 1}}>
        <Text style={{fontSize: 16, marginBottom:10, fontFamily:'AdventPro-Bold'}}>New Forum Post</Text>
        <View style={{width: width-100, fontSize: 30, marginBottom: 15, marginRight:15}}>
          <TextInput
              placeholder='Post Topic'
              value={this.state.topic}
              style={{fontFamily:'AdventPro-Bold', paddingBottom: 8, paddingTop: 12, paddingRight: 12, paddingLeft: 12, color: 'grey', borderColor: '#ccc', borderWidth: 1, minHeight:50}}
              onChangeText={(value) => this.setState({topic: value})}
              />
            </View>
        <View style={{width: width-100, fontSize: 30, marginRight:15}}>
          <TextInput
              placeholder='Post Content'
              multiline={true}
              value={this.state.content}
              style={{fontFamily:'AdventPro-Bold', textAlignVertical: 'top', textAlign:'justify', paddingBottom: 5, paddingTop: 12, paddingRight: 12, paddingLeft: 12, color: 'grey', borderColor: '#ccc', borderWidth: 1, minHeight:300}}
              onChangeText={(value) => this.setState({content: value})}
              />
            </View>
             <TouchableOpacity onPress={()=>{
                    this.setState({visible: true}, ()=>{
                      setTimeout(()=>{
                      this.setState({visible: false})
                      this.submitPost()
                  },3000)
                })
            }
                 } style={{height: 35, marginTop:10, flexDirection:'row', padding:4, alignSelf:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="check" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", fontFamily:'AdventPro-Bold', marginHorizontal:10}}>Submit Post</Text>
            </TouchableOpacity>
        </View>


    </View>
    
        
    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
    </React.Fragment>
    </ScrollView>
    )
}
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 250
  },
  modal5: {
    height: height - 140
  },
  modal6: {
    height: 250
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211,0.3)',
    marginBottom: 5
  },
  title:{
    fontSize: 30,
    color: '#ffffff',
    //fontWeight: 'bold'
  },
  logo: {
    width: 140,
    height: 165,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

});
function mapper(state) {
  return {
    currentUser: state.user.data,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    gpaSearch: (url, token, gpa, level, state, id, offset, e)=>
    {
        dispatch(
            gpaSearchCall(url, token, gpa, level, state, id, offset, e)
        )
    },
  };
};

export default connect(mapper, mapDispatchToProps)(NewForumScreen);