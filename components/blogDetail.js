import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getBlog} from '../settings';
import {getSingleBlogCall} from '../calls/blog';
import HTML from 'react-native-render-html';
const { height } = Dimensions.get('window');

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
    const blogId = navigation.getParam('blog_id', 'NO-ID');
    this.props.getBlog(getBlog, blogId);
  }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const { navigation } = this.props
        const blogId = navigation.getParam('blog_id', 'NO-ID');
        //const {id, topic, content, featuredImage} = this.props.blog
        return(
            <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
                <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>

                {this.props.blog?
                <React.Fragment>
                <Image source={{uri: `${this.props.blog.featuredImage}`}} style={{width: '100%', height:200, backgroundColor:'white'}}/>
                    <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}>
                    <Text style={{alignSelf:'center', fontSize:16, fontWeight:"bold", color:'black', marginVertical:10}}>{this.props.blog.topic}</Text>
                    <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={12} html={this.props.blog.content} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    </View>
                  </React.Fragment>
                :null
                }
                </View>               
            </View>
            </ScrollView>
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