import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import { onSignOut } from "../lib/auth";
import NavCard from "./card"
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
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
              onSignOut(e)
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
    //console.log(this.props.firstName.toString())
  }
  render() {
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 45;
    const deviceWidthinner = width - 40;
    const navWidth = ((width/3) - (10 + 10));
    const navHeight = (height/3) - 80;
    const BContent = <Icon style={[styles.btn, styles.btnModal]} name='close' size={30} color="#085078" />;
    let level = [{
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
    let countries = [{
      value: 'Ghana',
      label: 'Ghana',
    }, {
      value: 'Nigeria',
      label: 'Nigeria',
    }];
    let scholarshipCountry = [{
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
    let major = [{
      value: 'Accounting',
      label: 'Accounting',
    }, {
      value: 'Business',
      label: 'Business',
    },{
      value: 'Computer Science',
      label: 'Computer Science',
    },{
      value: 'Computer Engineering',
      label: 'Computer Engineering',
    },{
      value: 'Mechanical Engineering',
      label: 'Mechanical Engineering',
    },{
      value: 'Business',
      label: 'Business',
    }];
    return (
    <React.Fragment>
    <View style={styles.mainContent}>
    <StatusBar
        barStyle="light-content"
        backgroundColor="#085078"
        />
        <View style={{flex: 1, alignSelf: 'stretch', minHeight:bannerHeight, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', elevation: 3}}>
        <ImageBackground source={require('../assets/banner-img.png')} style={{backgroundColor:'#085078', flex: 1, width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent:'space-evenly'}}>
          <View style={{width: 120, height:120, borderRadius: 60, backgroundColor:'white', marginTop:12}}>
          </View>
          <View style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent:'space-between', marginTop:-20, paddingLeft:15, paddingRight:15}}>
          <View style={{}}>
            <Text onPress={() => this.refs.modal4.open()} style={{alignSelf:'center', color:'white', fontSize: 18}}>
              name
            </Text>
            </View>
            <View style={{}}>
            <Text onPress={() => this.refs.modal9.open()} style={{alignSelf:'center',color:'white', fontSize: 18}}>
              coin
            </Text>
          </View>
          </View>
        </ImageBackground>
        </View>
       <View style={{flex: 1, marginTop: 0, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
       <TouchableOpacity onPress={()=> this.refs.modal4.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="graduation-cap" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Level</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>Undergraduate</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.refs.modal5.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="book" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Major</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>Business</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.refs.modal6.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="globe" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Scholarship's Country</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>US</Text>
        </View>
        </TouchableOpacity>
       </View>
       <View style={{flex: 1, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
       <TouchableOpacity onPress={()=> this.refs.modal7.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="trophy" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>My GPA</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>3.3</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.refs.modal8.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="clipboard" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Criteria</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>Merit</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> console.log('saved')}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="download" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Saved</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>2</Text>
        </View>
        </TouchableOpacity>
       </View>
       <View style={{flex: 1, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
       <TouchableOpacity onPress={()=> alert('hey')}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="tachometer" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>My Referral</Text>
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>Points</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>3</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.refs.modal9.open()}>
        <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: navWidth, height: navHeight, backgroundColor: '#ffffff', elevation: 3}}>
          <Icon style={{textAlign: 'center'}} name="flag" size={30} color="#085078" />
          <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>My Country</Text>
          <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>Nigeria</Text>
        </View>
        </TouchableOpacity>
       <NavCard icon="ellipsis-h" title="More" width={navWidth} height={navHeight} />
       </View>
    </View>
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}> Update Level</Text>
    <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
    <Dropdown
        label='My Level'
        baseColor='#085078'
        textColor='#085078'
        fontSize={20}
        data={level}
      />
    </View>
    <TouchableHighlight
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
        data={major}
      />
    </View>
    <TouchableHighlight
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
        data={scholarshipCountry}
      />
    </View>
    <TouchableHighlight
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
      />
    </View>
    <TouchableHighlight
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
      />
    </View>
    <TouchableHighlight
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
      />
    </View>
    <TouchableHighlight
        onPress={()=>{this.setState({visible: !this.state.visible})}}
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
      //firstName: state.user,
      error: state.user.error,
      redirect: state.user.redirect
  }
}
/*const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};*/

export default connect(mapper/*, mapDispatchToProps*/)(HomeScreen);