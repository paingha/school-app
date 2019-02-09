import React from 'react';
import { StyleSheet, Platform, View, ScrollView, Text, Linking, StatusBar, AsyncStorage, FlatList, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import { RNS3 } from 'react-native-aws3'
import { onSignOut } from "../lib/auth";
import NavCard from "./card"
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getMajors, getCountries, updateUser, singleScholarship} from '../settings'
import {getMajorsCall, getApplicantCountriesCall} from '../calls/misc'
import {scholarshipSearchCall, noCoinCall, scholarshipUnSaveCall, scholarshipSaveCall, singleScholarshipCall, clearScholarshipCall, clearScholarshipsCall} from '../calls/scholarship'
import {updateUserCall, refreshUserCall} from '../calls/user'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
const { height } = Dimensions.get('window');

const options = [
  <Text style={{color: 'red', fontSize: 20}}>Close</Text>,
  <Text style={{color: '#000', fontSize: 20}}>First Name</Text>,
  <Text style={{color: '#000', fontSize: 20}}>Last Name</Text>,
  //<Text style={{color: '#000', fontSize: 20}}>Profile Picture</Text>
]

const imgOptions = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      majors: null,
      countries: null,
      level: '',
      major: '',
      gpa: 0,
      applicantCountry: '',
      scholarshipCountry: '',
      criteria: '',
      token: '',
      firstName: '',
      lastName: '',
      file: '',
      screenHeight: height,
      signedRequest: '',
      key: '',
      isloading: false
    }
  }

  static navigationOptions = ({ navigation }) =>{
    return {
      title: 'Dashboard',
      headerStyle: {
        backgroundColor: '#085078',
        textAlign: 'center',
        fontFamily: 'AdventPro-Medium',
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

  componentDidMount(){
    //alert(this.props.firstName.toString())
    this.props.fetchMajors(getMajors)
    this.props.fetchCountries(getCountries)
    AsyncStorage.getItem('TOKEN', (err, result)=>{
      if (result){
        //get user here
        this.setState({token: result})
      }
    })
  }

  moreData = (e) => {
    this.props.singleScholarship(singleScholarship, this.state.token, e)
    this.refs.savedModal1.open()
  }

  renderFooter = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 60
        }}
      >
      </View>
    )
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginTop:10,
          marginBottom:10,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  levelChange(value){
    this.setState({level: value})
  }

  majorChange(value){
    this.setState({major: value})
  }

  criteriaChange(value){
    this.setState({criteria: value})
  }

  gpaChange(value){
    this.setState({gpa: parseFloat(value)}, ()=>{
      //alert(parseFloat(value))
    })
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  applicantCountryChange(value){
    this.setState({applicantCountry: value})
  }

  scholarshipCountryChange(value){
    this.setState({scholarshipCountry: value})
  }

  getFileExtension3 = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  uploadImg = async (imageResponse) => {
    // Upload image to S3

    console.log('imageResponse =', imageResponse)
    const fileKey = Date.now() + Math.random().toString(36).substr(2, 25) + imageResponse.fileName;
    console.log('fileKey =', fileKey)

    const file = {
      uri: "file://" + imageResponse.path,
      name: fileKey,
      type: imageResponse.type
    }

    const options = {
      keyPrefix: 'theacademist-uploads/',
      bucket: 'apeelit-payment',
      region: 'us-west-2',
      accessKey: 'AKIAJSHEQSGSUAMESCJQ',
      secretKey: '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',
      successActionStaus: 201
    }

    let response = await RNS3.put(file, options)
    console.log('response =', response)
    if (response.status !== 201) {
      alert('Failed to upload image');
      return
    }

    const {id} = this.props.currentUser;
    this.props.updateProfile(updateUser, id, this.state.token, "image", response.body.postResponse.location)
    this.props.refreshData(id, this.state.token)
  }

  render() {
    const scrollEnabled = this.state.screenHeight > 550;
    const {id, firstName, lastName, coin, major, image, referralToken, scholarshipCountry, gpa, applicantCountry, saved, criteria, level} = this.props.currentUser;
    const savedNumber = saved.length
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 45;
    const deviceWidthinner = width - 40;
    const navWidth = ((width/3) - (10 + 10));
    const navHeight = (height/3) - 20;
    const BContent = <Icon style={[styles.btn, styles.btnModal]} name='close' size={30} color="#085078" />;
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
    return (
    <React.Fragment>
      <View style={styles.mainContent}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#085078"
        />
        <View style={{alignSelf: 'stretch', minHeight:bannerHeight, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', elevation: 3}}>
          <ImageBackground 
            source={require('../assets/banner-img.png')} 
            style={{
              backgroundColor:'#085078', 
              width: '100%', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent:'space-evenly',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={()=> 
                ImagePicker.showImagePicker(imgOptions, (response) => {
                  if (response.didCancel) {
                    alert('You cancelled Image upload');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                    alert('An error occured, please try again')
                  } else {
                    const source = { uri: response.uri };
                    console.log('response =',response)
                    
                    this.uploadImg(response);
                  }
                })
              }
            >
              <ImageBackground
                source={{uri: `${image}`}} 
                imageStyle={{ borderRadius: 60 }}
                style={{
                  width: 120, 
                  height:120, 
                  borderRadius: 60, 
                  backgroundColor:'white', 
                  marginTop: 12,
                  opacity: 1,
                  flexDirection:'column',
                  justifyContent:'center'
                }}
              >
              <Icon style={{textAlign: 'center'}} name="camera" size={30} color="#ffffff" />
              </ImageBackground>
            </TouchableOpacity>
            <View 
              style={{
                alignItems: 'flex-end', 
                width: '100%', 
                flexDirection: 'row', 
                justifyContent:'space-between', 
                marginBottom: 5, 
                paddingLeft: 15, 
                paddingRight: 15
              }}
            >
              <View style={{alignSelf:'flex-start'}}>
                <Text style={{alignSelf:'center', color:'white', fontSize: 25, fontFamily: 'AdventPro-Regular'}}>
                  {firstName} {lastName}
                </Text>
              </View>
              <View style={{alignSelf:'flex-end'}}>
                <Text style={{alignSelf:'center',color:'white', fontSize: 25, fontFamily: 'AdventPro-Regular'}}>
                  {coin} {coin > 0 ? <React.Fragment>coins</React.Fragment>: <React.Fragment>coin</React.Fragment>}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex: 1, marginTop: 0, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', fontFamily: 'AdventPro-Regular',}} >
      <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal4.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="graduation-cap" size={22} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>Level</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular',}}>{level? <React.Fragment>{level}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal5.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="book" size={22} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>Major</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{major? <React.Fragment>{major}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal6.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="globe" size={22} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>Scholarship's Country</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{scholarshipCountry? <React.Fragment>{scholarshipCountry}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
        </View>
        </TouchableOpacity>
      </View>
        <View style={{flex: 1, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal7.open()}>
          <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
            <Icon style={{textAlign: 'center'}} name="trophy" size={22} color="#085078" />
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>My GPA</Text>
            <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{gpa? <React.Fragment>{gpa}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal8.open()}>
          <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
            <Icon style={{textAlign: 'center'}} name="clipboard" size={22} color="#085078" />
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>Criteria</Text>
            <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{criteria? <React.Fragment>{criteria}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=> {
            this.refs.savedModal.open()
          }}>
          <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
            <Icon style={{textAlign: 'center'}} name="download" size={22} color="#085078" />
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>Saved</Text>
            <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{savedNumber? <React.Fragment>{savedNumber}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, height: '100%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
        <TouchableOpacity style={{flex:1}} >
          <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
            <Icon style={{textAlign: 'center'}} name="tachometer" size={22} color="#085078" />
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>My Referral</Text>
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>Points</Text>
            <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{referralToken? <React.Fragment>{referralToken}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal9.open()}>
          <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
            <Icon style={{textAlign: 'center'}} name="flag" size={22} color="#085078" />
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold'}}>My Country</Text>
            <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 18, fontFamily: 'AdventPro-Regular'}}>{applicantCountry? <React.Fragment>{applicantCountry}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={this.showActionSheet}>
          <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 0, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
            <Icon style={{textAlign: 'center'}} name="ellipsis-h" size={22} color="#085078" />
            <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontFamily: 'AdventPro-Bold' }}>More</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
      <ActionSheet
        ref={o => this.ActionSheet = o}
        title={<Text style={{color: '#085078', fontFamily: 'AdventPro-Medium', fontSize: 25}}>Update Your Profile</Text>}
        options={options}
        cancelButtonIndex={0}
        onPress={(index) => { 
          if (index == 1){
            this.refs.profile1.open()
          }
          else if(index == 2){
            this.refs.profile2.open()
          }
          /*else if(index == 3){
            this.selectPhotoTapped()
          }*/
        }}
      />

      <Modal style={[styles.modal, styles.modal6]} position={"bottom"} ref={"profile1"} backdropContent={BContent}>
        <Text style={{fontSize: 25, fontFamily: 'AdventPro-Medium', color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update First Name</Text>
        <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          spellCheck={false}
          placeholder='First Name'
          onChangeText={(firstName)=> this.setState({firstName})}
            style={{marginTop: 15, height: 40, fontFamily: 'AdventPro-Medium', backgroundColor: 'white', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
          />
        </View>
        <TouchableHighlight
          onPress={()=>{
              this.setState({visible: true}, ()=>{
                setTimeout(()=>{
                this.setState({visible: false})
              this.props.updateProfile(updateUser, id, this.state.token, "firstName", this.state.firstName)
              this.props.refreshData(id, this.state.token)
            },3000)
          })
          }}
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, fontFamily: 'AdventPro-Medium', color: 'white'}}> Update</Text>
        </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal6]} position={"bottom"} ref={"profile2"} backdropContent={BContent}>
        <Text style={{fontSize: 25, color: 'black', fontFamily: 'AdventPro-Medium', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Last Name</Text>
        <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          spellCheck={false}
          placeholder='Last Name'
          onChangeText={(lastName)=> this.setState({lastName})}
            style={{marginTop: 15, fontFamily: 'AdventPro-Medium', height: 40, backgroundColor: 'white', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
          />
        </View>
        <TouchableHighlight
          onPress={()=>{
            this.setState({visible: true}, ()=>{
              setTimeout(()=>{
              this.setState({visible: false})
            this.props.updateProfile(updateUser, id, this.state.token, "lastName", this.state.lastName)
            this.props.refreshData(id, this.state.token)
          },3000)
            })
          }}
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
          <Text style={{fontSize: 20, fontFamily: 'AdventPro-Medium', color: 'white'}}> Update </Text>
        </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal5]} position={"bottom"} ref={"savedModal"} swipeToClose={false} backdropContent={BContent}>
      <Text style={{fontSize: 25, color: 'black', fontFamily: 'AdventPro-Medium', marginTop:25, marginBottom:10, paddingBottom:0}}>Saved Scholarships</Text>
      {saved ?
          <FlatList
          style={{alignSelf: 'center', paddingRight:5, paddingLeft:5, marginBottom:15, fontSize:25, width:'90%'}}
              data={saved}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={this.renderFooter}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={({item}) => 
              <TouchableOpacity onPress={()=> this.moreData(item.id)}>
              <View styles={{flex: 1, width:'90%', paddingBottom: 40, marginBottom:15, backgroundColor:'white', elevation: 2, flexDirection:'row', paddingRight:5, paddingLeft:5}} key={item.id}>
              <View styles={{color:'#085078', fontSize:20, paddingRight:5, paddingLeft:5}}><Text style={{fontFamily: 'AdventPro-Medium'}}>{item.name}</Text></View>
              <View style={{flex: 1, flexDirection:'row', paddingRight:5, paddingLeft:5, justifyContent:'space-between', alignContent:'space-between'}}>
              <Text style={{fontFamily: 'AdventPro-Medium'}}>Country: {item.country}</Text>
              <Text style={{fontFamily: 'AdventPro-Medium'}}>Criteria: {item.criteria}</Text>
              <Text style={{fontFamily: 'AdventPro-Medium'}}>Major: {item.major ? <React.Fragment>{item.major.map(s => s.trim()).join(", ")}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
              </View>
              <View style={{flex: 1, paddingRight:5, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
              <Text style={{fontFamily: 'AdventPro-Medium'}}>Level: {item.level}</Text>
              <Text style={{fontFamily: 'AdventPro-Medium'}}>GPA: {item.gpa? <React.Fragment>{item.gpa.toFixed(2)}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
              </View>
              <View style={{flex: 1, paddingRight:5, marginVertical: 10, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
              <TouchableOpacity onPress={()=> this.setState({shows: true})}>
              <View style={{flex: 1, justifyContent: 'space-around', textAlign:'center', alignItems:'center', flexDirection: 'row', backgroundColor: '#ffffff'}}>
              <Icon style={{textAlign: 'center', marginRight:5, fontFamily: 'AdventPro-Medium'}} name="share-alt" size={25} color="#085078" /><Text style={{marginLeft:5, fontSize:20}}>Share</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.moreData(item.id)}>
              <View style={{flex: 1, justifyContent: 'space-around', textAlign:'center', alignItems:'center', flexDirection: 'row', backgroundColor: '#ffffff'}}>
              <Icon style={{textAlign: 'center', marginRight:5}} name="eye" size={25} color="#085078" /><Text style={{marginLeft:5, fontFamily: 'AdventPro-Medium', fontSize:20}}>View More</Text>
              </View>
              </TouchableOpacity>
              </View>
              </View>
              </TouchableOpacity>
          }
              />
          
              :
              <Text style={{fontSize: 20, marginTop:20, alignSelf:'center', fontFamily: 'AdventPro-Medium'}}>No Search Results </Text>
          }
      </Modal>
      
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"} backdropContent={BContent}>
      <Text style={{fontSize: 25, color: 'black', fontFamily: 'AdventPro-Medium', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Level</Text>
      <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
      <Dropdown
          label='My Level'
          baseColor='#085078'
          textColor='#085078'
          fontSize={20}
          data={levels}
          onChangeText={this.levelChange.bind(this)}
        />
      </View>
      <TouchableHighlight
          onPress={()=>{
            this.setState({visible: true}, ()=>{
              setTimeout(()=>{
              this.setState({visible: false})
            this.props.updateProfile(updateUser, id, this.state.token, "level", this.state.level)
            this.props.refreshData(id, this.state.token)
          },3000)
        })
        }
        }
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, color: 'white', fontFamily: 'AdventPro-Medium'}}> Update My Level</Text>
          </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal5"} backdropContent={BContent}>
      <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, fontFamily: 'AdventPro-Medium', paddingBottom:0}}> Update Major</Text>
      <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
      <Dropdown
          label='My Major'
          baseColor='#085078'
          textColor='#085078'
          fontSize={16}
          data={majors}
          onChangeText={this.majorChange.bind(this)}
        />
      </View>
      <TouchableHighlight
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          this.props.updateProfile(updateUser, id, this.state.token, "major", this.state.major)
          this.props.refreshData(id, this.state.token)
        },3000)
      })
      }
      }
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, color: 'white', fontFamily: 'AdventPro-Medium'}}> Update My Major</Text>
          </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} backdropContent={BContent}>
      <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, fontFamily: 'AdventPro-Medium', paddingBottom:0}}> Update Scholarship Country</Text>
      <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
      <Dropdown
          label='Scholarship Country'
          baseColor='#085078'
          textColor='#085078'
          fontSize={20}
          data={scholarshipCountries}
          onChangeText={this.scholarshipCountryChange.bind(this)}
        />
      </View>
      <TouchableHighlight
          onPress={()=>{
            this.setState({visible: true}, ()=>{
              setTimeout(()=>{
              this.setState({visible: false})
            this.props.updateProfile(updateUser, id, this.state.token, "scholarshipCountry", this.state.scholarshipCountry)
            this.props.refreshData(id, this.state.token)
          },3000)
        })
        }
        }
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, color: 'white', fontFamily: 'AdventPro-Medium'}}> Update Scholarship Country</Text>
          </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal7"} backdropContent={BContent}>
      <Text style={{fontSize: 25, fontFamily: 'AdventPro-Medium', color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update My GPA</Text>
      <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
      <Dropdown
          label='GPA'
          baseColor='#085078'
          textColor='#085078'
          fontSize={20}
          data={gpas}
          onChangeText={this.gpaChange.bind(this)}
        />
      </View>
      <TouchableHighlight
          onPress={()=>{
            this.setState({visible: true}, ()=>{
              setTimeout(()=>{
              this.setState({visible: false})
            this.props.updateProfile(updateUser, id, this.state.token, "gpa", this.state.gpa)
            this.props.refreshData(id, this.state.token)
          },3000)
        })
        }
        } 
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, fontFamily: 'AdventPro-Medium', color: 'white'}}> Update My GPA</Text>
          </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal8"} backdropContent={BContent}>
      <Text style={{fontSize: 25, color: 'black', marginTop:25, fontFamily: 'AdventPro-Medium', marginBottom:0, paddingBottom:0}}> Update My Criteria</Text>
      <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
      <Dropdown
          label='Criteria'
          baseColor='#085078'
          textColor='#085078'
          fontSize={20}
          data={criterias}
          onChangeText={this.criteriaChange.bind(this)}
        />
      </View>
      <TouchableHighlight
          onPress={()=>{
            this.setState({visible: true}, ()=>{
              setTimeout(()=>{
              this.setState({visible: false})
            this.props.updateProfile(updateUser, id, this.state.token, "criteria", this.state.criteria)
            this.props.refreshData(id, this.state.token)
          },3000)
        })
        }
        }
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, fontFamily: 'AdventPro-Medium', color: 'white'}}> Update My Criteria</Text>
          </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal9"} backdropContent={BContent}>
      <Text style={{fontSize: 25, color: 'black', marginTop:25, fontFamily: 'AdventPro-Medium', marginBottom:0, paddingBottom:0}}> Update My Country</Text>
      <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
      <Dropdown
          label='Country'
          baseColor='#085078'
          textColor='#085078'
          fontSize={20}
          data={countries}
          onChangeText={this.applicantCountryChange.bind(this)}
        />
      </View>
      <TouchableHighlight
          onPress={()=>{
            this.setState({visible: true}, ()=>{
              setTimeout(()=>{
              this.setState({visible: false})
            this.props.updateProfile(updateUser, id, this.state.token, "applicantCountry", this.state.applicantCountry)
            this.props.refreshData(id, this.state.token)
          },3000)
        })
        }
        }
          style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
          >
          <Text style={{fontSize: 20, fontFamily: 'AdventPro-Medium', color: 'white'}}> Update My Country</Text>
          </TouchableHighlight>
      </Modal>
      <Modal style={[styles.modal, styles.modal5]} position={"bottom"} ref={"savedModal1"} backdropContent={BContent}>
      
      {
        this.props.singleOne?
        <ScrollView 
                  style={{flex: 1, position: 'absolute', top:0, left:0, right:0, bottom:0}}
                  contentContainerStyle={{flexGrow: 1, alignContent:'center', position: 'absolute', top:0, left:0, right:0, bottom:0, paddingLeft:15, paddingRight:15}}
                  scrollEnabled={scrollEnabled}
                  onContentSizeChange={this.onContentSizeChange}
                  >
        <Text style={{fontSize: 25, fontFamily: 'AdventPro-Medium', color: 'black', marginTop:10, marginBottom:10, paddingBottom:0}}>{this.props.singleOne.name}</Text>
        <View style={{flex:1, width:'90%', marginHorizontal:5, marginBottom: 15}}>
      <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>Description:</Text> {this.props.singleOne.description? <React.Fragment>{this.props.singleOne.description}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>Amount:</Text> {this.props.singleOne.amount? <React.Fragment>{this.props.singleOne.amount}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>Level:</Text> {this.props.singleOne.level? <React.Fragment>{this.props.singleOne.level}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>GPA:</Text> {this.props.singleOne.gpa? <React.Fragment>{this.props.singleOne.gpa}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>MAJOR:</Text> {this.props.singleOne.major ? <React.Fragment>{this.props.singleOne.major.map(s => s.trim()).join(", ")}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>CRITERIA:</Text> {this.props.singleOne.criteria? <React.Fragment>{this.props.singleOne.criteria}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>APPLICANT COUNTRY:</Text> {this.props.singleOne.applicantCountry? <React.Fragment>{this.props.singleOne.applicantCountry}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>COUNTRY:</Text> {this.props.singleOne.country? <React.Fragment>{this.props.singleOne.country}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>DEADLINE:</Text> {this.props.singleOne.deadline? <React.Fragment>{this.props.singleOne.deadline}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>INSTITUTION:</Text> {this.props.singleOne.institution? <React.Fragment>{this.props.singleOne.institution}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <Text style={{fontSize: 16, marginVertical:5}}><Text style={{fontFamily: 'AdventPro-Bold'}}>COMMENT:</Text> {this.props.singleOne.comment? <React.Fragment>{this.props.singleOne.comment}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
          <TouchableOpacity onPress={
            ()=>{ Linking.openURL(`${this.props.singleOne.url}`)}
          } style={{paddingVertical: 10, marginBottom: 20, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
        <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
        <Text style={{fontSize:20, color:"white", fontFamily: 'AdventPro-Bold'}}>Apply</Text>
        </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
        :
        <Text style={{fontSize: 20, fontFamily: 'AdventPro-Medium', color: 'black', marginTop:25, marginBottom:10, paddingBottom:0}}>Select A School to View More Information</Text>
        
      }
      </Modal>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF', fontFamily: 'AdventPro-Bold'}} cancelable={false} animation="fade"/>
    </React.Fragment>
    );
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
    height: height - 200
  },
  modal6: {
    height: 250
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(211,211,211,0.3)',
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
      is_fetching: state.user.is_fetching,
      currentUser: state.user.data,
      majors: state.major.data,
      countries: state.country.data,
      error: state.user.error,
      redirect: state.user.redirect,
      singleOne: state.scholarship.single
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    singleScholarship: (url, token, scholarshipID) =>
    {
      dispatch(
        singleScholarshipCall(url, token, scholarshipID)
      )
    },
    clearScholarship: () => 
    {
      dispatch(
        clearScholarshipCall()
      )
    },
    refreshData: (userID, token) =>
    {
      dispatch(
        refreshUserCall(userID, token)
      )
    },
    updateProfile: (url, userID, token, toChange, change) => 
      {
        dispatch(
          updateUserCall(url, userID, token, toChange, change)
        );
      },
    fetchMajors: (url) => 
      {
        dispatch(
          getMajorsCall(url)
        );
      },fetchCountries: (url) => 
      {
        dispatch(
          getApplicantCountriesCall(url)
        );
      },
  };
};

export default connect(mapper, mapDispatchToProps)(HomeScreen);