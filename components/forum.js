import React from 'react'
import { StyleSheet, ActivityIndicator, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import {getForums, searchForum} from '../settings';
import {getForumCall, searchForumCall} from '../calls/forum';
import Loader from '../disc/loader';
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
        searchTerm: '',
        count: 0,
        serverData: [],
        fetching_from_server: false
    }
    this.offset = 0;
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
      fontWeight: '200',
      fontFamily: 'AdventPro-Bold',
      textAlign: 'center'
    },
  }
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  loadMore = () => {
    this.setState({ fetching_from_server: true }, () => {
      fetch('https://www.theacademist.com/api/v1/forum?offset=' + this.offset)
      //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
            this.offset = this.offset + 10;
            //After the response increasing the offset for the next API call.
            this.setState({
              serverData: [...this.state.serverData, ...responseJson.rows],
              //adding the new data with old one available in Data Source of the List
              fetching_from_server: false,
              count: responseJson.count
              //updating the loading state to false
            });                      
          })
          .catch(error => {
            console.error(error);
          });
    });
  }
  componentDidMount(){    
      fetch('https://www.theacademist.com/api/v1/forum?offset=' + this.offset)
      //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
          //Successful response from the API Call 
            this.offset = this.offset + 10;
            //After the response increasing the offset for the next API call.
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

    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const scrollEnabled1 = this.state.screenHeight > 500;
        const {payload} = this.state
        const { navigate } = this.props.navigation;
        const BContent = <Icon style={[styles.btn, styles.btnModal]} name='close' size={30} color="#085078" />;
    
          return( 
          <React.Fragment>
          <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
                <View style={{backgroundColor:'white', height:120, elevation:2, marginTop:10, width:'90%'}}>
                    <View style={{flexDirection:'row', width:'100%', alignContent:'center', alignItems:'center'}}>
                    <View style={{width:'60%', marginHorizontal:10, alignContent:'center'}}>
                    <TextField
                    label='Need Help?'
                    baseColor='#085078'
                    textColor='#085078'
                    labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
                    style={{fontFamily:'AdventPro-Bold'}}
                    onChangeText={(searchTerm) => this.setState({searchTerm})}
                    />
                    </View>
                    <TouchableOpacity onPress={()=> {
                      this.props.searchForum(searchForum, this.state.searchTerm)
                        this.refs.savedModal.open()
                      }} 
                      style={{height: 35, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
                    <Icon name="search" size={20} style={{marginLeft:3, color:'#085078', marginTop: 1}}/><Text style={{fontFamily:'AdventPro-Bold', fontSize:18, color:"#085078", marginHorizontal:10}}>SEARCH</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginHorizontal:10, alignContent:'center', alignItems:'center', marginVertical: 10, backgroundColor:'white', flex:1, elevation:2, width:'90%'}}>
                    <Text style={{fontSize:20, fontFamily:'AdventPro-Bold', marginVertical:10}}>Recent Articles</Text>
                    <View style={{flexDirection:'column', width:'80%'}}>
                    {this.state.serverData ?
                    <React.Fragment>
                    {this.state.serverData.map((forum, index) =>{
                  return (
                    <TouchableOpacity key={`${index}`}
                      onPress={() => {
                        this.props.navigation.navigate('ForumDetailView',{ forum_id: `${forum.id}`, topic: forum.topic})
                        }}
                    >
                      <View style={{flexDirection:'row', marginVertical:10}}>
                        <Icon name="book" size={20} style={{marginLeft:3, color:'#085078', marginTop: 1, marginRight: 10}}/>
                        <Text numberOfLines={1} style={{flex:1, fontSize:18, fontFamily:'AdventPro-Regular'}}>{forum.topic}</Text>
                      </View>
                    </TouchableOpacity>
                    )
                  })
                }
                    </React.Fragment>
                    :
                    <Loader />
                    }


                    </View>
                   
                    {this.state.loading ?
              null
              :
              <React.Fragment>
                {this.state.serverData.length >= 10 && this.state.serverData.length%10 == 0 ?
                    <View
                style={{
                  paddingVertical: 5,
                  marginVertical: 5,
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

                </View>                
            </View>
            
            </ScrollView>
          <Modal style={[styles.modal, styles.modal5]} position={"bottom"} ref={"savedModal"} backdropContent={BContent}>
          <ScrollView 
                style={{flex:1, width:'100%', paddingLeft:20, paddingRight:20}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled1}
                onContentSizeChange={this.onContentSizeChange}
                >
          <View style={{flex:1, alignContent:'center', paddingLeft:10, marginBottom:15, paddingRight:10}}>
          <Text style={{fontSize: 25, color: 'black', marginTop:25, marginBottom:10, paddingBottom:0}}>Search Results</Text>
          {this.props.results ?
              <React.Fragment>
              {this.props.results.rows.map((forum, index) =>{
            return (
              <TouchableOpacity key={`${index}`}
                onPress={() => {
                  this.props.navigation.navigate('ForumDetailView',{ forum_id: `${forum.id}`, topic: forum.topic})
                  }}
              >
                <View style={{flexDirection:'row', marginVertical:10}}>
                  <Icon name="book" size={20} style={{marginLeft:3, color:'#085078', marginTop: 1, marginRight: 10}}/>
                  <Text numberOfLines={1} style={{flex:1, fontSize:16}}>{forum.topic}</Text>
                </View>
              </TouchableOpacity>
              )
            })
          }
              </React.Fragment>
               
                  :
                  <Text style={{fontSize: 20, fontFamily:'AdventPro-Bold', marginTop:20, alignSelf:'center'}}>No Search Results </Text>
              }
              </View>
            </ScrollView>
          </Modal>
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
    height: 500
  },
  modal6: {
    height: 250
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
      forums: state.forum.data,
      results: state.forum.result,
      currentUser: state.user.data,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getForum: (url, offset, e) => {
      dispatch(
        getForumCall(url, offset, e)
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