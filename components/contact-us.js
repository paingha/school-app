import React from 'react'
import {View, Image, Alert, Text, Linking, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';
const { height, width } = Dimensions.get('window');

export default class ContactScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
      screenHeight: height,
      name: '',
      from: '',
      phone: '',
      content: '',
      isloading: false
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Contact Us',
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
  contactNow = () => {
    this.setState({isloading: true});
    const {content, phone, name, from} = this.state;
    if (from && name && content) {
        fetch('https://www.theacademist.com/services/contact-us', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({from, content, phone, name})
        })
        .then(
            response => response.json()
        )
        .then(
            data => this.setState({isloading: false, name: '', from:'', phone: '', content: ''}, ()=> {
                //success toastr
                Alert.alert('Success!', 'Message Sent Successfully')
            })
        )
    }
    else{
    this.setState({isloading: false}, ()=>{
        Alert.alert('Error!', 'Fill all required fields')
    })
}
}
  render(){
    const scrollEnabled = this.state.screenHeight > height - 50;
    onContentSizeChange = (contentWidth, contentHeight) => {
      this.setState({ screenHeight: contentHeight });
    };
    return(
      <ScrollView 
        style={{flex:1}}
        contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
        >
        <View style={{flex:1, minHeight: 150, flexDirection:'column', alignItems:'center', alignContent:'center', width:'100%'}}>
          <View style={{backgroundColor:'white', alignItems:'center', alignContent:'center', height:'100%', elevation:2, width:'100%'}}>
          <View style={{width: width-100, fontSize: 30, marginRight:15}}>
          <TextField
              label='Name (Required)'
              name='names'
              value={this.state.name}
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(value) => this.setState({name: value})}
              />
            </View>
            <View style={{width: width-100, fontSize: 30, marginRight:15}}>
          <TextField
              label='Email (Required)'
              name='emails'
              value={this.state.from}
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(value) => this.setState({from: value})}
              />
            </View>
            <View style={{width: width-100, fontSize: 30, marginRight:15}}>
          <TextField
              label='Phone'
              name='phones'
              value={this.state.phone}
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(value) => this.setState({phone: value})}
              />
            </View>
            <View style={{width: width-100, fontSize: 30, marginRight:15}}>
          <TextField
              label='Comments (Required)'
              name='comments'
              value={this.state.content}
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(value) => this.setState({content: value})}
              />
            </View>
            <TouchableOpacity onPress={()=> this.contactNow()} style={{height: 35, marginBottom: 18, width: width-100, marginTop:25, flexDirection:'row', padding:4, alignSelf:'center', justifyContent:'center', alignContent:'center', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="check" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", fontFamily:'AdventPro-Bold', marginHorizontal:10}}>SEND</Text>
            </TouchableOpacity>
           </View>
          
           
        </View>
        <View style={{marginBottom: 7, marginTop:7, minHeight:50, width:'100%', elevation: 1, padding:15, backgroundColor:'white',}}>
           <View styles={{flex: 1, marginRight:15, width: width-100, paddingBottom: 40, backgroundColor:'white', elevation: 2, flexDirection:'row', paddingRight:5, paddingLeft:5}}>
            <Text style={{color:'black', fontSize: 16, fontFamily:'AdventPro-Bold', marginBottom:7}}>Contact Details</Text>
            <Text style={{color:'black', fontSize: 16, fontFamily:'AdventPro-Bold', marginBottom:7}}><Icon name="phone" size={16} style={{color:'#4267b2', paddingRight:15, marginTop: 5}}/> <Text style={{color:'black', paddingLeft:15}}>+1 832 225 6169</Text></Text>
            <Text style={{color:'black', fontSize: 16, fontFamily:'AdventPro-Bold', marginBottom:7}}><Icon name="envelope" size={16} style={{color:'#4267b2', paddingRight:15, marginTop: 5}}/> <Text style={{color:'black', marginLeft:15}}>info@theacademist.com</Text></Text>
            <Text style={{color:'black', fontSize: 16, fontFamily:'AdventPro-Bold', marginBottom:7}}><Icon name="map-marker" size={16} style={{color:'#4267b2', paddingRight:15, marginTop: 5}}/> <Text style={{color:'black', marginLeft:15}}>Richmond, TX 77407</Text></Text>
            </View>
            </View>
            <View style={{flex:1, marginBottom: 15, minHeight:50, width:'100%', elevation: 1, padding:15, backgroundColor:'white', flexDirection:'column',}}>
            <Text style={{color:'black', fontSize: 16, fontFamily:'AdventPro-Bold'}}>Follow Us</Text> 
            <View style={{flex:1, marginBottom: 15, alignSelf:'center', alignItems:'stretch', justifyContent:'space-between', alignContent:'space-between', minHeight:50, width:'100%',padding:5, backgroundColor:'white', flexDirection:'row',}}>
            
            <TouchableOpacity onPress={()=> Linking.openURL(`https://www.facebook.com/TheAcademistCommunity`)} style={{height: 35, width: 100, marginTop:10, flexDirection:'row', padding:4, justifyContent:'center', alignContent:'center', borderRadius: 2, borderColor: '#4267b2', borderWidth: 1}}>
            <Icon name="facebook" size={20} style={{color:'#4267b2', marginTop: 5}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> Linking.openURL(`https://twitter.com/the_academist`)} style={{height: 35, width: 100, marginTop:10, flexDirection:'row', padding:4, justifyContent:'center', alignContent:'center', borderRadius: 2, borderColor: '#38A1F3', borderWidth: 1}}>
            <Icon name="twitter" size={20} style={{color:'#38A1F3', marginTop: 5}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> Linking.openURL(`https://twitter.com/the_academist`)} style={{height: 35, width: 100, marginTop:10, flexDirection:'row', padding:4, justifyContent:'center', alignContent:'center', borderRadius: 2, borderColor: '#458eff', borderWidth: 1}}>
            <Icon name="instagram" size={20} style={{color:'#458eff', marginTop: 5}}/>
            </TouchableOpacity>
            </View>
            </View>
            <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
    
        </ScrollView>
    )
  }
}