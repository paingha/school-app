import React from 'react';
import { StyleSheet, FlatList, View, Text, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStates, getCountries, gpa_search} from '../settings'
import {getStatesCall, getApplicantCountriesCall} from '../calls/misc'
import {gpaSearchCall} from '../calls/gpaSchool'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Dropdown } from 'react-native-material-dropdown';


class GpaScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      states: null,
      countries: null,
      hide: false,
      level: '',
      major: '',
      gpa: '',
      usState: '',
      token: '',
      offset: 0,
    }
  }
    static navigationOptions = ({ navigation }) =>{
      return {
        title: 'Search By GPA',
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
  async componentDidMount(){
    //alert(this.props.firstName.toString())
    await this.props.fetchStates(getStates)
    await this.props.fetchCountries(getCountries)
    await AsyncStorage.getItem('TOKEN', (err, result)=>{
      if (result){
        //get user here
        this.setState({token: result})
      }
    })
  }
  renderHeader = () => {
  return <Text style={{fontSize: 14, alignSelf:'center', paddingVertical:10, fontWeight:'bold'}}> {this.props.schools.count} {this.props.schools.count == 1 ? <Text>School Found</Text>:  <Text>Schools Found</Text> }</Text>;
  };
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
  stateChange(value){
    this.setState({usState: value})
  }
  gpaChange(value){
    this.setState({gpa: value}, ()=>{
      //alert(parseFloat(value))
    })
  }
  _keyExtractor = (item, index) => item.id;
  render() {
    const {id, firstName, lastName, coin, major, image, referralToken, scholarshipCountry, gpa, applicantCountry, saved, criteria, level} = this.props.currentUser;
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 200;
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
    let states = [{
        value: 'AL',
        label: 'AL',
      }, {
        value: 'AK',
        label: 'AK',
      }];
    
    return (
    <React.Fragment>
    <View style={styles.mainContent}>
    <StatusBar
        barStyle="light-content"
        backgroundColor="#085078"
        />
        <View style={{flex: 0.30, Height: '100%', padding: 0, backgroundColor:'white', alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 1}}>
        
      <View style={{marginTop: 0, marginBottom: 0.5, flexDirection: 'row'}} >
        <View style={{flex: 1, width: btnWidth1+80, paddingRight:0, paddingLeft:10}}>
      <Dropdown
        label='GPA'
        baseColor='#085078'
        textColor='#085078'
        fontSize={18}
        data={gpas}
        onChangeText={this.gpaChange.bind(this)}
      />
      </View>
      <View style={{flex: 1, width: btnWidth1-80, paddingRight:10, paddingLeft:10}}>
      <Dropdown
        label='Level'
        baseColor='#085078'
        textColor='#085078'
        fontSize={20}
        data={levels}
        onChangeText={this.levelChange.bind(this)}
      />
      </View>
      </View>
      <View style={{marginTop: 0, marginBottom: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
        <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
      <Dropdown
        label='State'
        baseColor='#085078'
        textColor='#085078'
        fontSize={20}
        data={states}
        onChangeText={this.stateChange.bind(this)}
      />
      </View>
      <View style={{flex: 1, width: btnWidth1, marginRight:10, paddingLeft:10}}>
      <TouchableHighlight
      onPress={()=>{
        this.setState({visible: true}, ()=>{
          setTimeout(()=>{
          this.setState({visible: false, hide: true})
          this.props.gpaSearch(gpa_search, this.state.token, this.state.gpa, this.state.level, this.state.usState, id, this.state.offset)
        },3000)
    })
    }
    }
         style={{alignItems: 'center', height: 50, marginBottom: 10, width: 150, elevation: 2, backgroundColor: '#FFBF71', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}>Search </Text>
        </TouchableHighlight>
      </View>
      </View>
      
        </View>
        <View style={{flex:0.70, alignSelf: 'stretch', height: 50, marginTop:4, backgroundColor:'white', alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 2}}>
        {this.props.schools ?
        <FlatList
        style={{alignSelf: 'center', paddingRight:5, paddingLeft:5, fontSize:25, width:'90%'}}
            data={this.props.schools.rows}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => 
            <View styles={{flex: 1, width:'90%', paddingBottom: 40, backgroundColor:'white', elevation: 2, flexDirection:'row', paddingRight:5, paddingLeft:5}} key={item.id}>
            <View styles={{color:'#085078', fontSize:20, paddingRight:5, paddingLeft:5}}><Text>{item.name}</Text></View>
            <View style={{flex: 1, flexDirection:'row', paddingRight:5, paddingLeft:5, justifyContent:'space-between', alignContent:'space-between'}}>
            <Text >SAT: {item.sat}</Text>
            <Text>ACT: {item.act}</Text>
            </View>
            <View style={{flex: 1, paddingRight:5, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
            <Text>Level: {item.level}</Text>
            <Text>GPA: {item.gpa.toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, paddingRight:5, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
            <Text>Share</Text>
            <Text>Save</Text>
            </View>
            </View>
        }
            />
         
            :
            <Text style={{fontSize: 20, marginTop:20, alignSelf:'center'}}>No Search Results </Text>
        }
        </View>
    </View>
    
    <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal9"} backdropContent={BContent}>
    <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:0, paddingBottom:0}}>No Coin</Text>
    <View style={{ flex: 1, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
    <Text>Not Enough Coin!</Text>
    </View>
    <TouchableHighlight
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
                alert('yes')
        },3000)
      })
      }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: btnWidth1, elevation: 1, backgroundColor: '#085078', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 20, color: 'white'}}> Buy Coin</Text>
        </TouchableHighlight>
    </Modal>
    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
    </React.Fragment>
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
    height: 450
  },
  modal6: {
    height: 250
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
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
      statesData: state.usState.data,
      countries: state.country.data,
      scholarships: state.scholarship.data,
      schools: state.gpaSchool.data,
      error: state.user.error,
      redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    gpaSearch: (url, token, gpa, level, state, id, offset)=>
    {
        dispatch(
            gpaSearchCall(url, token, gpa, level, state, id, offset)
        )
    },
    fetchStates: (url) => 
      {
        dispatch(
          getStatesCall(url)
        );
      },
      fetchCountries: (url) => 
      {
        dispatch(
          getApplicantCountriesCall(url)
        );
      },
  };
};

export default connect(mapper, mapDispatchToProps)(GpaScreen);