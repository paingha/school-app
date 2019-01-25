import React from 'react'
import {  
  FlatList, 
  View, 
  Text, 
  ScrollView, 
  TouchableNativeFeedback, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
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
        offset: 0,
        loading: true,
        count: 0,
        serverData: [],
        fetching_from_server: false
    };

    this.offset = 0;
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
      fetch('https://www.theacademist.com/api/v1/blog?offset=' + this.offset)
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
      fetch('https://www.theacademist.com/api/v1/blog?offset=' + this.offset)
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
        const { navigate } = this.props.navigation;
       
        return(
          <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
            {this.state.loading ?
              <Loader />
                    :
              <React.Fragment>
                <FlatList
                data={this.state.serverData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <TouchableNativeFeedback
                    onPress={() => {
                      this.props.navigation.navigate('BlogDetailView',{ blog_id: `${item.id}`, topic: item.topic})
                      }}
                  useForeground={true}
                  background={TouchableNativeFeedback.SelectableBackground()}>
                      <View style={{flex:1, borderBottomWidth: 4, borderBottomColor:'#085078', alignItems:'center', marginHorizontal:40, marginVertical: 10, backgroundColor:'white', minHeight:300, elevation:2, width:'80%'}}>
                          <Image source={{uri: `${item.featuredImage}`}} style={{width: '100%', height:180, backgroundColor:'white'}}/>
                          <Text style={{fontSize:22, textAlign: 'center', color:'black', fontFamily: 'AdventPro-Regular', marginVertical:3}} numberOfLines={2}>{item.topic}</Text>
                          <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                          <HTML ptSize={16} html={truncate(item.content, 20, { byWords: true })} baseFontStyle={{fontSize:16, fontFamily:'AdventPro-Regular'}} imagesMaxWidth={Dimensions.get('window').width} />
                          </View>
                          <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                          <View></View>
                          </View>
                      </View>
                  </TouchableNativeFeedback>
                }
                />
              </React.Fragment>                     
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