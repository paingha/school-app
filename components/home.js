import React from 'react';
import { StyleSheet, View, Text, StatusBar, AsyncStorage, FlatList, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import { onSignOut } from "../lib/auth";
import NavCard from "./card"
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getMajors, getCountries, updateUser} from '../settings'
import {getMajorsCall, getApplicantCountriesCall} from '../calls/misc'
import {updateUserCall} from '../calls/user'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Dropdown } from 'react-native-material-dropdown';

const options = [
  <Text style={{color: 'red', fontSize: 20}}>Close</Text>,
  <Text style={{color: '#000', fontSize: 20}}>First Name</Text>,
  <Text style={{color: '#000', fontSize: 20}}>Last Name</Text>,
  //<Text style={{color: '#000', fontSize: 20}}>Profile Picture</Text>
]

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
      avatarSource: ''
    }
  }
    static navigationOptions = ({ navigation }) =>{
      return {
        title: 'Dashboard',
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
          fontWeight: 'bold',
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
  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          marginVertical: 20,
          borderColor: "#CED0CE",
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity style={{paddingVertical: 10, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <Text style={{fontSize:20, color:"white"}}>Load More</Text>
      </View>
      </TouchableOpacity>
      </View>
    );
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
  applicantCountryChange(value){
    this.setState({applicantCountry: value})
  }
  scholarshipCountryChange(value){
    this.setState({scholarshipCountry: value})
  }
  render() {
    const {id, firstName, lastName, coin, major, image, referralToken, scholarshipCountry, gpa, applicantCountry, saved, criteria, level} = this.props.currentUser;
    const savedNumber = saved.length
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 45;
    const deviceWidthinner = width - 40;
    const navWidth = ((width/3) - (10 + 10));
    const navHeight = (height/3) - 40;
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
        <View style={{flex: 1, alignSelf: 'stretch', minHeight:bannerHeight, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', elevation: 3}}>
        <ImageBackground source={require('../assets/banner-img.png')} style={{backgroundColor:'#085078', flex: 1, width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent:'space-evenly'}}>
          <Image source={{uri: `${image}`}} style={{width: 120, height:120, borderRadius: 60, backgroundColor:'white', marginTop:12}}/>
          <View style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent:'space-between', marginTop:-20, paddingLeft:15, paddingRight:15}}>
          <View style={{}}>
            <Text onPress={() => this.refs.modal4.open()} style={{alignSelf:'center', color:'white', fontSize: 18}}>
              {firstName} {lastName}
            </Text>
            </View>
            <View style={{}}>
            <Text onPress={() => this.refs.modal9.open()} style={{alignSelf:'center',color:'white', fontSize: 18}}>
              {coin} {coin > 0 ? <React.Fragment>coins</React.Fragment>: <React.Fragment>coin</React.Fragment>}
            </Text>
          </View>
          </View>
        </ImageBackground>
        </View>
        <View style={{flex: 1, marginTop: 0, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
       <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal4.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="graduation-cap" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Level</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{level}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal5.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="book" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Major</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{major}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal6.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="globe" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Scholarship's Country</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{scholarshipCountry}</Text>
        </View>
        </TouchableOpacity>
       </View>
       <View style={{flex: 1, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
       <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal7.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="trophy" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>My GPA</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{gpa}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal8.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="clipboard" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Criteria</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{criteria}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> {
          this.refs.savedModal.open()
        }}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="download" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Saved</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{savedNumber}</Text>
        </View>
        </TouchableOpacity>
       </View>
       <View style={{flex: 1, height: '100%', marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
       <TouchableOpacity style={{flex:1}} >
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="tachometer" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>My Referral</Text>
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Points</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{referralToken}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=> this.refs.modal9.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="flag" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>My Country</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{applicantCountry}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={this.showActionSheet}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="ellipsis-h" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>More</Text>
        </View>
        </TouchableOpacity>
       </View>
    </View>
    <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{color: '#085078', fontSize: 20}}>Update Your Profile</Text>}
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
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update First Name</Text>
    <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
    <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      spellCheck={false}
      placeholder='First Name'
      onChangeText={(firstName)=> this.setState({firstName})}
        style={{marginTop: 15, height: 40, backgroundColor: 'white', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
    </View>
    <TouchableHighlight
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          this.props.updateProfile(updateUser, id, this.state.token, "firstName", this.state.firstName)
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update</Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal6]} position={"bottom"} ref={"profile2"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Last Name</Text>
    <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
    <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      spellCheck={false}
      placeholder='Last Name'
      onChangeText={(lastName)=> this.setState({lastName})}
        style={{marginTop: 15, height: 40, backgroundColor: 'white', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
    </View>
    <TouchableHighlight
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          this.props.updateProfile(updateUser, id, this.state.token, "lastName", this.state.lastName)
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update </Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal5]} position={"bottom"} ref={"savedModal"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:10, paddingBottom:0}}>Saved Scholarships</Text>
    {saved ?
        <FlatList
        style={{alignSelf: 'center', paddingRight:5, paddingLeft:5, marginBottom:15, fontSize:25, width:'90%'}}
            data={saved}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => 
            <View styles={{flex: 1, width:'90%', paddingBottom: 40, backgroundColor:'white', elevation: 2, flexDirection:'row', paddingRight:5, paddingLeft:5}} key={item.id}>
            <View styles={{color:'#085078', fontSize:20, paddingRight:5, paddingLeft:5}}><Text>{item.name}</Text></View>
            <View style={{flex: 1, flexDirection:'row', paddingRight:5, paddingLeft:5, justifyContent:'space-between', alignContent:'space-between'}}>
            <Text >Country: {item.country}</Text>
            <Text>Criteria: {item.criteria}</Text>
            </View>
            <View style={{flex: 1, paddingRight:5, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
            <Text>Level: {item.level}</Text>
            <Text>GPA: {item.gpa? <React.Fragment>{item.gpa.toFixed(2)}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
            </View>
            <View style={{flex: 1, paddingRight:5, marginVertical: 10, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
            <TouchableOpacity onPress={()=> this.setState({shows: true})}>
            <View style={{flex: 1, justifyContent: 'space-around', textAlign:'center', alignItems:'center', flexDirection: 'row', backgroundColor: '#ffffff'}}>
            <Icon style={{textAlign: 'center', marginRight:5}} name="share-alt" size={25} color="#085078" /><Text style={{marginLeft:5, fontSize:20}}>Share</Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
        }
            />
         
            :
            <Text style={{fontSize: 20, marginTop:20, alignSelf:'center'}}>No Search Results </Text>
        }
    </Modal>
    
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Level</Text>
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
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update My Level</Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal5"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Major</Text>
    <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
    <Dropdown
        label='My Major'
        baseColor='#085078'
        textColor='#085078'
        fontSize={20}
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
      },3000)
    })
    }
    }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update My Major</Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Scholarship Country</Text>
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
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update Scholarship Country</Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal7"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update My GPA</Text>
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
        },3000)
      })
      }
      } 
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update My GPA</Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal8"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update My Criteria</Text>
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
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update My Criteria</Text>
        </TouchableHighlight>
    </Modal>
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal9"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update My Country</Text>
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
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Update My Country</Text>
        </TouchableHighlight>
    </Modal>
    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
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
    height: 500
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
      redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
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