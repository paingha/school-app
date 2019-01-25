import React from 'react';
import { StyleSheet, FlatList, Clipboard,
  ToastAndroid,
  AlertIOS,
  ActivityIndicator,
  Platform, View, Text, StatusBar, Linking, AsyncStorage, ScrollView, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStates, getCountries, major_search, singleMajor} from '../settings'
import {getStatesCall, getApplicantCountriesCall} from '../calls/misc'
import {majorSearchCall, singleMajorCall, clearMajorCall} from '../calls/majorSchool'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Dropdown } from 'react-native-material-dropdown';
import Share, {ShareSheet, Button} from 'react-native-share';
const { height } = Dimensions.get('window');

class MajorScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      states: null,
      shows: false,
      countries: null,
      hide: false,
      level: '',
      major: '',
      usState: '',
      country: '',
      token: '',
      offset: 0,
      loadMore: false,
      screenHeight: height,
      loading: true,
      count: 0,
      serverData: [],
      fetching_from_server: false
    }
    this.offset = 0;
  }
    static navigationOptions = ({ navigation }) =>{
      return {
        title: 'Search By Major',
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
      showActionSheet = () => {
        this.ActionSheet.show()
      }
      onCancel() {
        this.setState({shows:false});
      }
      onOpen() {
        this.setState({shows:true});
      }
      moreData = (e) => {
        this.props.singleMajor(singleMajor, this.state.token, e)
        this.refs.savedModal.open()
      }
      loadMore = () => {
        this.setState({ fetching_from_server: true }, () => {
          const {token, major, level, country, state} = this.state
          let offset = this.offset
          fetch(`${major_search}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
            mode: 'cors',
            body: JSON.stringify({state, major: major.trim(), level, country, offset})
        })
          //Sending the currect offset with get request
              .then(response => response.json())
              .then(responseJson => {
              //Successful response from the API Call 
                this.offset = this.offset + 10;
                //After the response increasing the offset for the next API call.
                this.setState({
                  serverData: [...this.state.serverData, ...responseJson.rows],
              //adding the new data with old one available in Data Source of the List
              fetching_from_server: false,
              count: responseJson.count
              //updating the loading state to false
                });           
                // alert('bbbb' + this.state.serverData[1].topic);
              })
              .catch(error => {
                console.error(error);
              });
        });
      }
      fetchSchool = (token, majorRaw, level, country, state) => { 
        //alert(token + ' ' + major + ' ' + level + ' ' + state + ' ' + country)   
        let major = majorRaw.trim()
        let offset = this.offset
          fetch(`${major_search}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
            mode: 'cors',
            body: JSON.stringify({state, major, level, country, offset})
        })
          //Sending the currect offset with get request
              .then(response => response.json())
              .then(responseJson => {
              //Successful response from the API Call 
                this.offset = this.offset + 10;
                //After the response increasing the offset for the next API call.
                //alert(responseJson.count)
                this.setState({
                  serverData: [...this.state.serverData, ...responseJson.rows],
                  //adding the new data with old one available in Data Source of the List
                   loading: false,
                   count: responseJson.count
                  //updating the loading state to false
                });           
                // alert('bbbb' + this.state.serverData[1].topic);
              })
              .catch(error => {
                console.error(error);
              });
      }
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
    return <Text style={{alignSelf:'center', paddingVertical:10, fontFamily:'AdventPro-Regular', fontSize:18}}> {this.state.count} {this.state.count == 1 ? <Text>School Found</Text>:  <Text>Schools Found</Text> }</Text>;
    };
    renderFooter = () => {
      return(
      <React.Fragment>
      {this.state.loading? 
        null
        :
        <React.Fragment>
          {this.state.serverData.length >= 10 && this.state.serverData.length%10 == 0 ?
              <View
              style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                marginVertical: 20,
                borderColor: "#CED0CE",
                alignSelf: 'center'
              }}
        >
          <TouchableOpacity activeOpacity={0.9}  onPress={this.loadMore} style={{paddingVertical: 10, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
        <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
        <Text style={{fontSize:20, fontFamily:'AdventPro-Regular', color:"white"}}>Load More</Text>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
        ) : null}
        </View>
        </TouchableOpacity>
        </View>
        :null
      } 
      </React.Fragment>
    }
    </React.Fragment>
  )
    };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          marginTop:5,
          marginBottom:5,
          width: "100%",
        }}
    
      />
    );
  };
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  levelChange(value){
    this.setState({level: value})
  }
  componentWillUnmount(){
    this.props.clearMajor()
  }
  stateChange(value){
    this.setState({usState: value})
  }
  countryChange(value){
    this.setState({country: value})
  }
  majorChange(value){
    this.setState({major: value}, ()=>{
      //alert(parseFloat(value))
    })
  }
  _keyExtractor = (item, index) => item.id;
  render() {
    const {id, firstName, lastName, coin, major, image, referralCode, referralToken, scholarshipCountry, gpa, applicantCountry, savedID, saved, criteria, level} = this.props.currentUser;
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width;
    let shareOptions = {
      title: "The Academist",
      message: "I just found schools on The Academist",
      url: `https://www.theacademist.com/register?ref=${referralCode}`,
      subject: "Find Schools by Majors on The Academist" //  for email
    };
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 200;
    const deviceWidthinner = width - 40;
    const scrollEnabled = this.state.screenHeight > 550;
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
    let canadaStates = [{
      value: 'AB',
      label: 'Alberta'
    },
    {
      value: 'BC',
      label: 'British Columbia'
    },
    {
      value: 'MB',
      label: 'Manitoba'
    },
    {
      value: 'NB',
      label: 'New Brunswick'
    },
    {
      value: 'NL',
      label: 'Newfoundland and Labrador'
    },
    {
      value: 'NS',
      label: 'Nova Scotia'
    },
    {
      value: 'NT',
      label: 'Northwest Territories'
    },
    {
      value: 'NU',
      label: 'Nunavut'
    },{
      value: 'ON',
      label: 'Ontario'
    },{
      value: 'PE',
      label: 'Prince Edward Island'
    },{
      value: 'QC',
      label: 'Québec'
    },{
      value: 'SK',
      label: 'Saskatchewan'
    },{
      value: 'YT',
      label: 'Yukon'
    }
  ];
    let states = [{
        value: 'AL',
        label: 'AL',
      }, {
        value: 'AK',
        label: 'AK',
      }];
      let countryOptions = [{
        value: 'US',
        label: 'US',
      }, {
        value: 'Canada',
        label: 'Canada',
      }];
    
    return (
    <React.Fragment>
    <View style={styles.mainContent}>
    <StatusBar
        barStyle="light-content"
        backgroundColor="#085078"
        />
        <View style={{flex: 0.35, flexGrow: 0.42, width:'90%', marginBottom:5, marginTop:10, Height: '100%', padding: 0, backgroundColor:'white', alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 1}}>
         
      <View style={{marginTop: 0, marginBottom: 0.5, flexDirection: 'row'}} >
        <View style={{flex: 1, width: btnWidth1+80, paddingRight:0, paddingLeft:10}}>
      <Dropdown
        label='Major'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={this.props.majors}
        onChangeText={this.majorChange.bind(this)}
      />
      </View>
      <View style={{flex: 1, width: btnWidth1-80, paddingRight:10, paddingLeft:10}}>
      <Dropdown
        label='Level'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={levels}
        onChangeText={this.levelChange.bind(this)}
      />
      </View>
      </View>
      <View style={{marginTop: 0, marginBottom: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
        <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
        {this.props.statesData?
        <React.Fragment>
        {this.state.country !== "Canada"?
      <Dropdown
        label='State'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={this.props.statesData}
        onChangeText={this.stateChange.bind(this)}
      />
      :
      <Dropdown
        label='State'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={canadaStates}
        onChangeText={this.stateChange.bind(this)}
      />
        }
         </React.Fragment>
        :
      <Dropdown
        label='State'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={states}
        onChangeText={this.stateChange.bind(this)}
      />
      }
      </View>
      <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
      <Dropdown
        label='Country'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={countryOptions}
        onChangeText={this.countryChange.bind(this)}
      />
      </View>
      </View>
      <View style={{marginTop: 5, marginBottom: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
        <View style={{flex: 1, width: btnWidth1, paddingRight:10, paddingLeft:10}}>
        
      </View>
      <View style={{flex: 1, width: btnWidth1, marginRight:10, paddingLeft:10}}>
      <TouchableHighlight
      onPress={()=>{
        this.setState({visible: true}, ()=>{
          setTimeout(()=>{
          this.setState({visible: false, hide: true})
          this.fetchSchool(this.state.token, this.state.major, this.state.level, this.state.country, this.state.usState)
        },3000)
    })
    }
    }
    style={{height: 50, paddingHorizontal:25, marginRight:10, flexDirection:'row', padding:4, alignItems: 'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}
    >
    <React.Fragment>
    <Icon style={{textAlign: 'center', marginRight:15}} name="search" size={25} color="#085078" />
    <Text style={{fontSize: 20, fontFamily:'AdventPro-Bold', color: '#085078'}}>Search </Text>
     </React.Fragment>
    </TouchableHighlight>
      </View>
      </View>
        </View>
        <View style={{flex:0.58, width:'90%', alignSelf: 'center', height: 50, marginTop:4, alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 2}}>
        {this.state.serverData.length > 0 ?
        <FlatList
        style={{alignSelf: 'center', fontSize:25, width:'100%'}}
        data={this.state.serverData}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ItemSeparatorComponent={this.renderSeparator}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
        <TouchableOpacity 
        style={{marginBottom: 5, minHeight:50, width:'100%', elevation: 1, padding:15, backgroundColor:'white',}}
        onPress={()=> this.moreData(item.id)}>
            <View styles={{flex: 1, width:'90%', paddingBottom: 40, backgroundColor:'white', elevation: 2, flexDirection:'row', paddingRight:5, paddingLeft:5}} key={item.id}>
           
            <View style={{color:'#085078', marginBottom: 5}}><Text style={{color:'#085078', alignSelf:'center', fontSize:20, fontFamily:'AdventPro-Bold', marginBottom: 5}}>{item.name}</Text></View>
            <View style={{flex: 1, flexDirection:'row', paddingRight:5, paddingLeft:5, justifyContent:'space-between', alignContent:'space-between'}}>
            <Text style={{fontFamily:'AdventPro-Regular', fontSize:20}}>{item.level == "Undergraduate"? <React.Fragment>SAT: {item.sat? <React.Fragment>{item.sat}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</React.Fragment>: <React.Fragment>GRE: {item.gre? <React.Fragment>{item.gre}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</React.Fragment>}</Text>
            <Text style={{fontFamily:'AdventPro-Regular', fontSize:20}}>{item.level == "Undergraduate"? <React.Fragment>ACT: {item.sat? <React.Fragment>{item.act}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</React.Fragment>: <React.Fragment>GMAT: {item.gmat? <React.Fragment>{item.gmat}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</React.Fragment>}</Text>
            </View>
            <View style={{flex: 1, paddingRight:5, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
        <Text style={{fontFamily:'AdventPro-Regular', fontSize:20}}>Level: {item.level? <React.Fragment>{item.level}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
            <Text style={{fontFamily:'AdventPro-Regular', fontSize:20}}>GPA: {item.gpa? <React.Fragment>{item.gpa.toFixed(2)}</React.Fragment>: <React.Fragment>N/A</React.Fragment>}</Text>
            </View>
            <View style={{flex: 1, paddingRight:5, marginVertical: 10, paddingLeft:5, flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
            <TouchableOpacity 
            style={{borderColor: '#085078', borderWidth: 1, padding:6}}
            onPress={()=> this.setState({shows: true})}>
            <View style={{flex: 1, justifyContent: 'space-around', textAlign:'center', alignItems:'center', flexDirection: 'row', backgroundColor: '#ffffff'}}>
            <Icon style={{textAlign: 'center', marginRight:3}} name="share-alt" size={15} color="#085078" /><Text style={{marginLeft:2, fontFamily:'AdventPro-Regular', fontSize:20}}>Share</Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
            </TouchableOpacity>
        }
            />
         
            :
            <Text style={{fontSize: 20, marginTop:20, fontFamily:'AdventPro-Bold', alignSelf:'center'}}>No Search Results </Text>
        }
        </View>
    </View>
   
    <ShareSheet visible={this.state.shows} onCancel={this.onCancel.bind(this)}>
          <Button iconSrc={{ uri: TWITTER_ICON }}
                  onPress={()=>{
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "twitter"
                }));
              },300);
            }}>Twitter</Button>
          <Button iconSrc={{ uri: FACEBOOK_ICON }}
                  onPress={()=>{
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "facebook"
                }));
              },300);
            }}>Facebook</Button>
          <Button iconSrc={{ uri: WHATSAPP_ICON }}
                  onPress={()=>{
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "whatsapp"
                }));
              },300);
            }}>Whatsapp</Button>
          <Button iconSrc={{ uri: EMAIL_ICON }}
                  onPress={()=>{
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "email"
                }));
              },300);
            }}>Email</Button>
          <Button
            iconSrc={{ uri: CLIPBOARD_ICON }}
            onPress={()=>{
              this.onCancel();
              setTimeout(() => {
                if(typeof shareOptions["url"] !== undefined) {
                  Clipboard.setString(shareOptions["url"]);
                  if (Platform.OS === "android") {
                    ToastAndroid.show('Link copied', ToastAndroid.SHORT);
                  } else if (Platform.OS === "ios") {
                    AlertIOS.alert('Link copied');
                  }
                }
              },300);
            }}>Copy Link</Button>
          <Button iconSrc={{ uri: MORE_ICON }}
            onPress={()=>{
              this.onCancel();
              setTimeout(() => {
                Share.open(shareOptions)
              },300);
            }}>More</Button>
        </ShareSheet>
        <Modal style={[styles.modal, styles.modal5]} position={"bottom"} ref={"savedModal"} backdropContent={BContent}>
    
    {
      this.props.ourSchool?
      <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center', paddingLeft:15, paddingRight:15}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
      
      <View style={{color:'#085078', marginTop:6, marginBottom: 5}}><Text style={{color:'#085078', alignSelf:'center', fontSize:20, fontFamily:'AdventPro-Bold', marginBottom: 5}}>{this.props.ourSchool.name}</Text></View>
      <View style={{flex:1, width:'90%', marginHorizontal:5}}>
    <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>Description:</Text> {this.props.ourSchool.description? <React.Fragment>{this.props.ourSchool.description}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>Span:</Text> {this.props.ourSchool.span? <React.Fragment>{this.props.ourSchool.span}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>Level:</Text> {this.props.ourSchool.level? <React.Fragment>{this.props.ourSchool.level}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>GPA:</Text> {this.props.ourSchool.gpa? <React.Fragment>{this.props.ourSchool.gpa}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>SAT:</Text> {this.props.ourSchool.sat? <React.Fragment>{this.props.ourSchool.sat}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>ACT:</Text> {this.props.ourSchool.act? <React.Fragment>{this.props.ourSchool.act}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>GRE:</Text> {this.props.ourSchool.gre? <React.Fragment>{this.props.ourSchool.gre}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>GMAT:</Text> {this.props.ourSchool.gmat? <React.Fragment>{this.props.ourSchool.gmat}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>TOEFL:</Text> {this.props.ourSchool.toefl? <React.Fragment>{this.props.ourSchool.toefl}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>IELTS:</Text> {this.props.ourSchool.ielts? <React.Fragment>{this.props.ourSchool.ielts}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>ADDRESS:</Text> {this.props.ourSchool.address? <React.Fragment>{this.props.ourSchool.address}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>CITY:</Text> {this.props.ourSchool.city? <React.Fragment>{this.props.ourSchool.city}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>STATE:</Text> {this.props.ourSchool.state? <React.Fragment>{this.props.ourSchool.state}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <Text style={{fontSize: 16, fontFamily:'AdventPro-Regular', marginVertical:5}}><Text style={{fontFamily:'AdventPro-Bold', fontSize:18}}>ZIP:</Text> {this.props.ourSchool.zip? <React.Fragment>{this.props.ourSchool.zip}</React.Fragment>: <React.Fragment>N/A</React.Fragment> }</Text>
        <TouchableOpacity onPress={
          ()=>{ Linking.openURL(`${this.props.ourSchool.website}`)}
        } style={{paddingVertical: 10, marginBottom: 20, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <Text style={{fontSize:20, fontFamily:'AdventPro-Bold', color:"white"}}>Visit Website</Text>
      </View>
      </TouchableOpacity>
      </View>
      </ScrollView>
      :
      <Text style={{fontSize: 20, color: 'black', marginTop:25, marginBottom:10, paddingBottom:0}}>Select A School to View More Information</Text>
      
    }
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
    height: height - 200
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
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

//  whatsapp icon
const WHATSAPP_ICON = "data:image/png;base64,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";

//  email icon
const EMAIL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1KY/fjOGj44DU7UvndMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G6XvQwAAAABJRU5ErkJggg==";

//  clipboard icon
const CLIPBOARD_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAB5lBMVEUAAAA8PDw+Pj4/Pz8/Pz8/Pz8/Pz8+Pj47OzsAAAA5OTk+Pj4/Pz8/Pz8+Pj49PT0/Pz8/Pz85OTlAQEA/Pz87Ozs+Pj4+Pj4/Pz8/Pz8/Pz8zMzNBQUE/Pz8/Pz8/Pz9AQEA7Ozs9PT0/Pz9AQEA+Pj4/Pz8+Pj4AAABAQEA/Pz87OztBQUE/Pz8+Pj4zMzNDQ0M/Pz89PT03Nzc/Pz8/Pz8/Pz8/Pz88PDw8PDwAAABCQkI7Ozs9PT0/Pz9AQEA/Pz8uLi4rKytAQEA/Pz89PT0+Pj4/Pz8/Pz8/Pz9CQkJAQEA/Pz9CQkI/Pz8/Pz8/Pz8+Pj49PT0/Pz8yMjI/Pz88PDw/Pz9BQUE8PDw/Pz9AQEA/Pz8/Pz8/Pz89PT0/Pz9CQkI9PT1EREQ9PT08PDw4ODg+Pj6AgIA/Pz8/Pz82NjZVVVU7Ozs/Pz81NTVAQEA/Pz8+Pj49PT1BQUE/Pz8/Pz8/Pz8vLy8/Pz87OztAQEA3Nzc9PT0+Pj4/Pz89PT0/Pz8/Pz89PT1AQEA9PT04ODgzMzM/Pz8/Pz9AQEA/Pz9AQEA/Pz83Nzc9PT0/Pz9AQEA/Pz8+Pj4+Pj5AQEA/Pz89PT1FRUU5OTk/Pz8/Pz8+Pj47Ozs/Pz89PT08PDw+Pj6z1Mg0AAAAonRSTlMAEXTG8/7pslICKMn//J0u2LcSLNu9Y0523KoKL9b7hggauZsEOuJ/ARS7VifkiwUX0bEq1f1p6KGQAz4NpnpY8AsGtMIyb46NbSOMcRuh+fGTFc0z1yKFKy/dpKff1CqKMoYPp+lAgAKd6kIDhdorJJExNjflktMr3nkQDoXbvaCe2d2EijIUn3JsbjDDF1jjOOdWvIDhmhoJfWrAK7bYnMgx8fGWAAACNUlEQVRIx+2W6V8SURSGBxEVeydMbVER1DCwRNTCEhMNsywqExXcUrNVU9NK2wy1fd9sMyvrP+1cmYH5eK5f5f3APef85hnuvfPeM6MoaaW1dWXKMGdasrJzrJtgc7dhQ+p2kzRry4OuHfmSbEEhUTt37d5TRGNxiRRrLwUczjKKyiuI3uuSYCv3ARa3ZyOu2k/xAT5b7aXra3xaVlsH1LPZg4cAvzM10wbgMBs+QqtsDKTyJroXGz7a7AgandECtPLXfKzFY8hCbcBxFudpP3Gy49RpQ8UXtgBnOOzZc53CU+e7Ism7uYnt5ji0p1e3pDmqzTnmAEr7GGz/AGEDg0MXaBgeERXrKIWFBQz2IvlYHbtEh/EycOUqVQLXVCDPxvGz+MPYdRGWjE/coGFyyg9M32SwM8PkydlQIim7JX6DxHpvM9g7c+SjoLESmqd9vjvDYO9NEzs1aahYY7SK+3Zm31Ddmp8jDx4qysIj2qt4O6dviH4xqvk5soj40vJjqjzh7HOf6BtPtb1SnulG6X3O6bHdqb5BejHbKtDOl+UcQ78iNuwzFKKvwx1v3npYJ+kd0BYynqz3Eu2OZvnB+IyCRVE+TD5qSmWBRuDjJzb8GWhIJq4xv36kWKoH6mr1vlFDnvRW86e9Qtd/qUrs1VeKv1VKbJjrOz3Wih8UrTpF37ArMlotFmfg58raLxrjvyXfifl/ku/TdZsiK9NfNcH+y93Ed4A1JzvLkmnOMClppbV19R+iQFSQ2tNASwAAAABJRU5ErkJggg==";

//  more icon
const MORE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=";

function mapper(state) {
  return {
      is_fetching: state.user.is_fetching,
      currentUser: state.user.data,
      statesData: state.usState.data,
      countries: state.country.data,
      majors: state.major.data,
      ourSchools: state.majorSchool.data,
      ourSchool: state.majorSchool.single,
      error: state.user.error,
      redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    majorSearch: (url, token, major, level, country, state, offset, e)=>
    {
        dispatch(
            majorSearchCall(url, token, major, level, country, state, offset, e)
        )
    },
    singleMajor: (url, token, schoolID)=>
    {
      dispatch(
        singleMajorCall(url, token, schoolID)
      )
    },
    clearMajor: ()=>
    {
      dispatch(
        clearMajorCall()
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

export default connect(mapper, mapDispatchToProps)(MajorScreen);