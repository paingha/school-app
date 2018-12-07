import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getForum, newReply} from '../settings';
import {getSingleForumCall, postCommentCall} from '../calls/forum';
import HTML from 'react-native-render-html';
const { height } = Dimensions.get('window');

class ForumDetailScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        offset: 0,
        content: '',
        token: ''
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: `${navigation.getParam('topic', 'Forum Detail')}`,
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
          navigation.navigate('EightthView')
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
      fontWeight: 'bold',
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
    const forumId = navigation.getParam('forum_id', 'NO-ID');
    this.props.getForum(getForum, forumId);
    AsyncStorage.getItem('TOKEN', (err, result)=>{
      if (result){
        //get user here
        this.setState({token: result})
      }
    })
  }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const { navigation } = this.props;
        const forum_id = navigation.getParam('forum_id', 'NO-ID');
        const topic = navigation.getParam('topic', 'no topic');
        const {id, firstName, lastName} = this.props.currentUser;
        return(
          <ScrollView 
            style={{flex:1}}
            contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
              <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
                <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}>
                {this.props.forum?
                <React.Fragment>
                  <Text style={{alignSelf:'center', fontSize:16, fontWeight:"bold", color:'black', marginVertical:10}}>{this.props.forum.topic}</Text>
                  <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={12} html={this.props.forum.content} imagesMaxWidth={Dimensions.get('window').width} />
                  </View>
                  </React.Fragment>
                :null
                }
                </View>
              </View>               
            </View>
            
            {this.props.forum?
            <React.Fragment>
            {this.props.forum.replies.map((reply, index) =>{
            return (
            <View key={`${index}`} style={{flex:1, flexGrow:1, flexDirection:'row', alignItems:'center', paddingVertical:10, width:'100%', marginTop:10}}>
            <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '20%', marginLeft:10, height:80, borderRadius: 40, backgroundColor:'white'}}/>
            <View style={{backgroundColor:'white', marginLeft: 10, height:'100%', paddingVertical:10, paddingHorizontal:15, elevation:2, width:'70%'}}>
            <Text><Text style={{fontWeight:'bold'}}>{reply.firstName} {reply.lastName}</Text> said</Text>
            <Text>{reply.content}</Text>
            </View>
            </View>
           )
          })
        }
        </React.Fragment>
        :null
      }
            
            <View
        style={{
          paddingVertical: 5,
          marginVertical: 5,
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity style={{paddingVertical: 10, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <Text style={{fontSize:20, color:"white"}}>Load More</Text>
      </View>
      </TouchableOpacity>
      </View>
            <View style={{flex:1, marginTop:10, marginBottom:10, flexDirection:'column', width:'100%' , paddingLeft:5, paddingRight:5}}>
            <TextInput
            style={{borderColor:'#085078', textAlignVertical: "top", borderWidth:2, width:'100%', height:100, paddingLeft:10, paddingRight:10, backgroundColor:'white'}}
            value={this.state.comment}
            placeholder="Post a Comment"
            onChangeText={(content) => {this.setState({content})}}
            multiline={true}
            underlineColorAndroid='transparent'
            />
            <TouchableOpacity onPress={()=>{this.props.postComment(newReply, this.state.content, id, forum_id, firstName, lastName, this.state.token, getForum)}} style={{marginTop:10, height: 35, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="pencil" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Post Comment</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

function mapper(state) {
    return {
        forum: state.forum.single,
        currentUser: state.user.data
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getForum: (url, id) => {
        dispatch(
          getSingleForumCall(url, id)
        );
      },
      postComment: (url, content, by, forumId, firstName, lastName, token, reload) => {
        dispatch(
          postCommentCall(url, content, by, forumId, firstName, lastName, token, reload)
        );
      },
    }
  }
  
  export default connect(mapper, mapDispatchToProps)(ForumDetailScreen); 