import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getBlogs} from '../settings';
import {getBlogCall} from '../calls/blog';
import HTML from 'react-native-render-html';
import Loader from '../disc/loader';
import truncate from 'truncate-html';
const { height } = Dimensions.get('window');

class BlogScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        offset: 0
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Blog',
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
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  loadMore = () => {
    const {offset} = this.state;
    this.setState({offset: offset + 10}, ()=>{
      let data
      if (this.props.blogs.rows){
        let data = this.props.blogs.rows
        this.props.getBlog(getBlogs, this.state.offset, data);
      }
      else{
        let data = []
        this.props.getBlog(getBlogs, this.state.offset, data);
      }
      
    })
  }
  componentDidMount(){
    //call getForum here
    this.props.getBlog(getBlogs, this.state.offset, []);
  }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const { navigate } = this.props.navigation;
       
        return(
            <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
            {this.props.blogs ?
            <React.Fragment>
            {this.props.blogs.rows.map((blog, index)=>{
            return (
              <TouchableNativeFeedback key={`${index}`}
              onPress={() => {
                this.props.navigation.navigate('BlogDetailView',{ blog_id: `${blog.id}`, topic: blog.topic})
                }}
            useForeground={true}
            background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{flex:1, borderBottomWidth: 4, borderBottomColor:'#085078', alignItems:'center', marginHorizontal:10, marginVertical: 10, backgroundColor:'white', minHeight:300, elevation:2, width:'80%'}}>
                    <Image source={{uri: `${blog.featuredImage}`}} style={{width: '100%', height:180, backgroundColor:'white'}}/>
                    <Text style={{fontSize:22, color:'black', fontFamily: 'AdventPro-Regular', marginVertical:3}} numberOfLines={2}>{blog.topic}</Text>
                    <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={16} html={truncate(blog.content, 20, { byWords: true })} baseFontStyle={{fontSize:16, fontFamily:'AdventPro-Regular'}} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                    <View></View>
                    </View>
                </View>
            </TouchableNativeFeedback>
           )
          })
        } 
        </React.Fragment>
                    :
                    <Loader />
                    }             
            </View>
        {this.props.blogs ?
        <React.Fragment>
        {this.props.blogs.rows.length >= 10 ?
            <View
        style={{
          paddingVertical: 5,
          marginVertical: 5,
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity  onPress={this.loadMore} style={{paddingVertical: 10, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <Text style={{fontSize:20, fontFamily:'AdventPro-Regular', color:"white"}}>Load More</Text>
      </View>
      </TouchableOpacity>
      </View>
      :null
      } 
      </React.Fragment>
      :null
      }
            </ScrollView>
        )
    }
}

function mapper(state) {
    return {
      blogs: state.blog.data,
        currentUser: state.user.data,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getBlog: (url, offset, e) => {
        dispatch(
          getBlogCall(url, offset, e)
        );
      },
    }
  }
  
  export default connect(mapper, mapDispatchToProps)(BlogScreen);