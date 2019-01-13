import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getForum, newReply, show_info} from '../settings';
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
        token: '',
        image: 'https://via.placeholder.com/150x150'
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
  getUserInfo = (id) => {
    fetch(show_info.replace("{user_id}", id), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ image: data.image });
      });
  }
  loadMore = () => {
    const {offset} = this.state;
    this.setState({offset: offset + 5}, ()=>{
      if (this.props.forum && this.props.forum.replies){
        let data = this.props.forum.replies
        //this.props.getForum(getForums, this.state.offset, data);
        const { navigation } = this.props
        const forumId = navigation.getParam('forum_id', 'NO-ID');
        this.props.getForum(getForum, forumId, data);
      }
      else{
        let data = []
        //this.props.getForum(getForums, this.state.offset, data);
        const { navigation } = this.props
        const forumId = navigation.getParam('forum_id', 'NO-ID');
        this.props.getForum(getForum, forumId, data);
      }
      
    })
  }
  componentDidMount(){
    //call getForum here
    const { navigation } = this.props
    const forumId = navigation.getParam('forum_id', 'NO-ID');
    this.props.getForum(getForum, forumId, []);
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
        const array = ((this.props.forum && this.props.forum.replies) ? this.props.forum.replies : []);
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
                  <Text style={{alignSelf:'center', fontSize:20, fontFamily:'AdventPro-Bold', color:'black', marginVertical:10}}>{this.props.forum.topic}</Text>
                  <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={12} html={this.props.forum.content} baseFontStyle={{fontSize:18, fontFamily:'AdventPro-Regular'}} imagesMaxWidth={Dimensions.get('window').width} />
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
            {this.getUserInfo.call(this, reply.by)}
            <Image source={{
              uri: `${this.state.image}`
              }} style={{width: '20%', marginLeft:10, height:80, borderRadius: 40, backgroundColor:'white'}}/>
            <View style={{backgroundColor:'white', marginLeft: 10, height:'100%', paddingVertical:10, paddingHorizontal:15, elevation:2, width:'70%'}}>
            <Text><Text style={{fontFamily:'AdventPro-Bold', fontSize: 18}}>{reply.firstName} {reply.lastName}</Text> said</Text>
            <Text style={{fontFamily:'AdventPro-Regular', fontSize: 16}}>{reply.content}</Text>
            </View>
            </View>
           )
          })
        }
        </React.Fragment>
        :null
      }
      {this.props.forum && this.props.forum.replies?
      <React.Fragment>
      {this.props.forum.replies.length >= 5?
            
            <View
        style={{
          paddingVertical: 5,
          marginVertical: 5,
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity onPress={this.loadMore} style={{paddingVertical: 10, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <Text style={{fontSize:20, color:"white"}}>Load More</Text>
      </View>
      </TouchableOpacity>
      </View>
      :
      null
      }
      </React.Fragment>
      :null
      }
            <View style={{flex:1, marginTop:10, marginBottom:10, flexDirection:'column', width:'100%' , paddingLeft:5, paddingRight:5}}>
            <TextInput
            style={{borderColor:'#085078', fontFamily:'AdventPro-Regular', fontSize: 16, textAlignVertical: "top", borderWidth:2, width:'100%', height:100, paddingLeft:10, paddingRight:10, backgroundColor:'white'}}
            value={this.state.content}
            placeholder="Post a Comment"
            onChangeText={(content) => {this.setState({content})}}
            multiline={true}
            underlineColorAndroid='transparent'
            />
            <TouchableOpacity onPress={()=>{
              this.props.postComment(newReply, this.state.content, id, forum_id, firstName, lastName, this.state.token, getForum, array)
              this.setState({content:''})
              }} style={{marginTop:10, height: 35, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="pencil" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontFamily:'AdventPro-Regular', fontSize:20, color:"#085078", marginHorizontal:10}}>Post Comment</Text>
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
      getForum: (url, id, e) => {
        dispatch(
          getSingleForumCall(url, id, e)
        );
      },
      postComment: (url, content, by, forumId, firstName, lastName, token, reload, e) => {
        dispatch(
          postCommentCall(url, content, by, forumId, firstName, lastName, token, reload, e)
        );
      },
    }
  }
  
  export default connect(mapper, mapDispatchToProps)(ForumDetailScreen); 