import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getForums, searchForum} from '../settings';
import {getForumCall, searchForumCall} from '../calls/forum';
const { height } = Dimensions.get('window');

class ForumScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        offset: 0,
        visible: false,
        loading: true,
        payload: this.props.forums,
        searchTerm: ''
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Forum',
    headerStyle: {
      backgroundColor: '#085078',
      textAlign: 'center',
    },
    headerLeft: (
      <TouchableOpacity>
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
        />
        </TouchableOpacity>),
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
    this.props.getForum(getForums, this.state.offset);
  }
  /*componentWillReceiveProps(nextProps){
    if(nextProps.forums !== this.props.forums){
      this.setState({payload: nextProps.forums})
    }
  }*/
//TODO: Implement load more button
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const {payload} = this.state
        const { navigate } = this.props.navigation;
          return( 
          <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
                <View style={{backgroundColor:'white', height:120, elevation:2, width:'100%'}}>
                    <View style={{flexDirection:'row', width:'100%', alignContent:'center', alignItems:'center'}}>
                    <View style={{width:'60%', marginHorizontal:10, alignContent:'center'}}>
                    <TextField
                    label='Need Help?'
                    baseColor='#085078'
                    textColor='#085078'
                    onChangeText={(searchTerm) => this.setState({searchTerm})}
                    />
                    </View>
                    <TouchableOpacity onPress={()=> this.props.searchForum(searchForum, this.state.searchTerm)} style={{height: 35, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="search" size={20} style={{marginLeft:3, color:'#085078', marginTop: 1}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>SEARCH</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginHorizontal:10, alignContent:'center', alignItems:'center', marginVertical: 10, backgroundColor:'white', flex:1, elevation:2, width:'90%'}}>
                    <Text style={{fontSize:18, fontWeight:'bold', marginVertical:10}}>Recent Articles</Text>
                    <View style={{flexDirection:'column', width:'80%'}}>
                      <TouchableOpacity
                      onPress={() => navigate('TwelvethViewStack')}>
                    <View style={{flexDirection:'row', marginVertical:10}}>
                      <Icon name="book" size={20} style={{marginLeft:3, color:'#085078', marginTop: 1, marginRight: 10}}/><Text numberOfLines={1} style={{flex:1, fontSize:16}}>How to Buy Coin</Text>
                      </View>
                      </TouchableOpacity>



                    </View>
                </View>                
            </View>
            </ScrollView>
        )
    }
}

function mapper(state) {
  return {
      currentUser: state.user.data,
      forums: state.forum.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getForum: (url, offset) => {
      dispatch(
        getForumCall(url, offset)
      );
    },
    searchForum: (url, search) => {
      dispatch(
        searchForumCall(url, search)
      );
    }
  }
}

export default connect(mapper, mapDispatchToProps)(ForumScreen);