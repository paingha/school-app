import React from 'react'
import { StyleSheet, FlatList, View, Text, Linking, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getBlog} from '../settings';
import {getSingleBlogCall} from '../calls/blog';
import HTML from 'react-native-render-html';
import { FloatingAction } from 'react-native-floating-action';
import Share from 'react-native-share';
const { height } = Dimensions.get('window');
const actions = [{
  text: 'Twitter',
  icon: {uri: 'https://s3.us-west-2.amazonaws.com/apeelit-payment/twitter-icon.png'},
  name: 'twitter',
  color: '#38A1F3',
  position: 2
}, {
  text: 'Facebook',
  icon: {uri: 'https://s3.us-west-2.amazonaws.com/apeelit-payment/facebook-icon.png'},
  name: 'facebook',
  color: '#4267b2',
  position: 1
}/*, {
  text: 'Whatsapp',
  icon: require('./images/ic_room_white.png'),
  name: 'bt_room',
  color: '',
  position: 3
}, {
  text: 'Sms',
  icon: require('./images/ic_videocam_white.png'),
  name: 'bt_videocam',
  color: '',
  position: 4
}*/];
class BlogDetailScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        offset: 0
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: `${navigation.getParam('topic', 'NO-ID')}`,
    headerStyle: {
      backgroundColor: '#085078',
      textAlign: 'center',
    },
    headerLeft: (
      <Icon
        name="arrow-left"
        size={20}
        onPress={()=> {
          let e = navigation;
          //onSignOut(e)
          navigation.navigate('SeventhView')
          //navigation.navigate('Drawer')
        }}        
        style={{
          marginLeft: 15, 
          paddingRight: 15,
          color:'#ffffff'
        }}
        />),
        headerRight: (
            <Icon
              name="ellipsis-v"
              size={20}
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
  componentDidMount(){
    //call getForum here
    const { navigation } = this.props
    const blogId = navigation.getParam('blog_id', 'NO-ID');
    this.props.getBlog(getBlog, blogId);
  }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const { navigation } = this.props
        const blogId = navigation.getParam('blog_id', 'NO-ID');
        let shareOptions = {
          title: "The Academist",
          message: "I just found schools on The Academist",
          url: `https://www.theacademist.com/register`,
          subject: "Find Schools by GPA on The Academist" //  for email
        };
        //const {id, topic, content, featuredImage} = this.props.blog
        return(
          <React.Fragment>
            
            <ScrollView 
                style={{flex:0.90}}
                contentContainerStyle={{flexGrow: 0.85, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
                
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
                <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
                
                {this.props.blog?
                <React.Fragment>
                <Image source={{uri: `${this.props.blog.featuredImage}`}} style={{width: '100%', height:200, backgroundColor:'white'}}/>
                    <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}>
                    
                    <Text style={{alignSelf:'center', fontSize:20, fontFamily:'AdventPro-Bold', color:'black', marginVertical:10}}>{this.props.blog.topic}</Text>
                    <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={18} html={this.props.blog.content}  baseFontStyle={{fontSize:18, fontFamily:'AdventPro-Regular'}} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    </View>
                  </React.Fragment>
                :null
                }
                </View> 
                         
            </View>
            
            </ScrollView>
            <View style={{flex:0.10, alignContent:'center', alignItems:'center', justifyContent:'space-between', flexDirection:'row', backgroundColor:'#085078', elevation:3}}>
            <View style={{marginLeft:20, alignContent:'center', alignItems:'center', justifyContent:'space-between', flexDirection:'row',}}>
            <Icon style={{textAlign: 'center', marginRight: 10}} name="share-alt-square" size={25} color="#ffffff" /><Text style={{fontSize:22, fontFamily:'AdventPro-Bold', color:'#ffffff'}}>Share: </Text>
            </View>
            <View style={{ alignContent:'center', alignItems:'center', justifyContent:'space-between', flexDirection:'row', marginRight:20}}>
            <TouchableOpacity
            onPress={()=>{
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "facebook"
                }));
            }}
            style={{width: 32, height: 32, backgroundColor:'transparent', marginRight: 20}}
            >
            <Image 
                source={{uri: `https://s3.us-west-2.amazonaws.com/apeelit-payment/theacademist-uploads/facebook-share-icon-1.png`}} 
                style={{
                  width: 32, 
                  height: 32, 
                  borderRadius: 16, 
                  
                }}
              />
              </TouchableOpacity>
              <TouchableOpacity
            style={{width: 32, height: 32, backgroundColor:'transparent', marginRight: 20}}
            onPress={()=>{
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "twitter"
                }))}}
            >
              <Image 
                source={{uri: `https://s3.us-west-2.amazonaws.com/apeelit-payment/theacademist-uploads/twitter-share-icon.png`}} 
                style={{
                  width: 32, 
                  height: 32, 
                  borderRadius: 16,
                }}
              />
              </TouchableOpacity>
              <TouchableOpacity
            style={{width: 32, height: 32, backgroundColor:'transparent', marginRight: 20}}
            onPress={()=>{
                Share.shareSingle(Object.assign(shareOptions, {
                  "social": "whatsapp"
                }))
            }}
            >
              <Image 
                source={{uri: `https://s3.us-west-2.amazonaws.com/apeelit-payment/theacademist-uploads/whatsapp-share-icon.png`}} 
                style={{
                  width: 32, 
                  height: 32, 
                  borderRadius: 16, 
                }}
              />
              </TouchableOpacity>
            </View>
            </View>
            </React.Fragment>
        )
    }
}


function mapper(state) {
    return {
        blog: state.blog.single,
        currentUser: state.user.data
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getBlog: (url, id) => {
        dispatch(
          getSingleBlogCall(url, id)
        );
      },
    }
  }
  
  export default connect(mapper, mapDispatchToProps)(BlogDetailScreen);