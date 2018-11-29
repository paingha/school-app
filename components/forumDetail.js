import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getBlogs} from '../settings';
import {getBlogCall} from '../calls/blog';
import HTML from 'react-native-render-html';
const { height } = Dimensions.get('window');

export default class ForumDetailScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        offset: 0,
        comment: ''
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
          navigation.navigate('EightthViewStack')
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
    //this.props.getBlog(getBlogs, this.state.offset);
  }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const { navigation } = this.props
        const blogId = navigation.getParam('blog_id', 'NO-ID');
        const blogData = {
            "id": 1,
            "topic": "How Easy Can Scholarship Applications Be?",
            "content": "<p>Scholarships are free money in various amounts that aid students in paying for their college tution. There is an endless amount of available scholarships international students are able to take adavantage of, ranging from students with a proven low household income, to indivduals that have excelled academically. Criteria for scholarships varies drastically beyond just these two listed, so don&rsquo;t worry, there is definitely free money out there that you might qualify for. Here, we will discuss how international students unfortunatley miss out in scholarship oppurtunities</p>\n\n<p>Application Deadline</p>\n\n<p>Failure to apply for scholarships on time is a major reason why some students become ineligible for one. In most cases, its due to the lack of awarenes on the deadlines. </p>\n\n<p>Many scholarships require the student to have taken exams such IELTS, TOEFL, SAT, ACT, GRE, or GMAT, depending on what level and which of it is applicable to you;</p>\n\n<p>GPA Requirement</p>\n\n</p>\n",
            "urlParam": "how-easy-can-scholarship-applications-be?",
            "featuredImage": "https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg",
            "by": 1,
            "createdAt": "2018-11-27T03:37:09.930Z",
            "updatedAt": "2018-11-27T03:37:09.930Z",
            "deletedAt": null
          }
        return(
            <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
                <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
                <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '100%', height:200, backgroundColor:'white'}}/>
                    <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}>
                    <Text style={{alignSelf:'center', fontSize:16, fontWeight:"bold", color:'black', marginVertical:10}}>{blogData.topic}</Text>
                    <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={12} html={blogData.content} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    </View>
                </View>               
            </View>


            <View style={{flex:1, flexGrow:1, flexDirection:'row', alignItems:'center', paddingVertical:10, width:'100%', marginTop:10}}>
            <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '20%', marginLeft:10, height:80, borderRadius: 40, backgroundColor:'white'}}/>
            <View style={{backgroundColor:'white', marginLeft: 10, height:'100%', paddingVertical:10, paddingHorizontal:15, elevation:2, width:'70%'}}>
            <Text><Text style={{fontWeight:'bold'}}>Joe Alagoa</Text> said</Text>
            <Text>Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...</Text>
            </View>
            </View>

            <View style={{flex:1, flexGrow:1, flexDirection:'row', alignItems:'center', paddingVertical:10, width:'100%', marginTop:10}}>
            <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '20%', marginLeft:10, height:80, borderRadius: 40, backgroundColor:'white'}}/>
            <View style={{backgroundColor:'white', marginLeft: 10, height:'100%', paddingVertical:10, paddingHorizontal:15, elevation:2, width:'70%'}}>
            <Text><Text style={{fontWeight:'bold'}}>Joe Alagoa</Text> said</Text>
            <Text>Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...</Text>
            </View>
            </View>

            <View style={{flex:1, flexGrow:1, flexDirection:'row', alignItems:'center', paddingVertical:10, width:'100%', marginTop:10}}>
            <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '20%', marginLeft:10, height:80, borderRadius: 40, backgroundColor:'white'}}/>
            <View style={{backgroundColor:'white', marginLeft: 10, height:'100%', paddingVertical:10, paddingHorizontal:15, elevation:2, width:'70%'}}>
            <Text><Text style={{fontWeight:'bold'}}>Joe Alagoa</Text> said</Text>
            <Text>Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...</Text>
            </View>
            </View>

            <View style={{flex:1, flexGrow:1, flexDirection:'row', alignItems:'center', paddingVertical:10, width:'100%', marginTop:10}}>
            <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '20%', marginLeft:10, height:80, borderRadius: 40, backgroundColor:'white'}}/>
            <View style={{backgroundColor:'white', marginLeft: 10, height:'100%', paddingVertical:10, paddingHorizontal:15, elevation:2, width:'70%'}}>
            <Text><Text style={{fontWeight:'bold'}}>Joe Alagoa</Text> said</Text>
            <Text>Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...Old comment here...</Text>
            </View>
            </View>

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
            onChangeText={comment=>this.setState({comment})}
            multiline={true}
            underlineColorAndroid='transparent'
            />
            <TouchableOpacity onPress={this.addRow} style={{marginTop:10, height: 35, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="pencil" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", marginHorizontal:10}}>Post Comment</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

/*function mapper(state) {
    return {
        currentUser: state.user.data,
        blogs: state.blog.data
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getBlog: (url, offset) => {
        dispatch(
          getBlogCall(url, offset)
        );
      },
    }
  }
  
  export default connect(mapper, mapDispatchToProps)(BlogScreen); */