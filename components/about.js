import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');

export default class AboutScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
      screenHeight: height,
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'About Us',
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

    render(){
      const scrollEnabled = this.state.screenHeight > height - 250;
        return(
          <ScrollView 
          style={{flex:1, backgroundColor:'#fff'}}
          contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
          >
          <View style={{flex:1, flexDirection:'column', marginBottom: 35, alignItems:'center', marginTop:15, paddingBottom:15, width:'100%'}}>
            <View style={{backgroundColor:'white', height:'100%', paddingBottom:15, paddingTop:10, width:'100%'}}>
              <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
              <Image resizeMode={'contain'} source={{uri: "https://www.theacademist.com/img/academist-logo-300x300.jpg"}} style={{width: '100%', alignSelf: 'stretch', height:200, marginTop:-10, backgroundColor:'white'}}/>
              <Text style={{fontSize:20, color:'black', fontFamily: 'AdventPro-Bold', marginTop:10}}>Our Pride</Text>
              <Text style={{fontSize:14, color:'black', alignSelf:'center', fontFamily: 'AdventPro-Bold', marginTop:10}}>–The only scholarship source service for international students–</Text>
              <Text style={{paddingHorizontal:15 , alignSelf:'center', fontSize:16, fontFamily: 'AdventPro-Regular', marginTop:10}}>At “The Academist” our biggest aim is to help the international students who plan on studying abroad in the US, and Canada with the necessary information. It is quite hard for students as they lack the know-how of how to change their GPA to the standard US and Canada grade as well as being able to match their GPA to the most appropriate university or school. We also provide scholarship information. Getting all this in one place is very hard for the students as they must search various sites to get the information and even then, they may not be accurate. The Academist ensures that all information provided is accurate. Most countries do not have the same system as the US, and Canada, and this is where we come in to help . Are you a high school student looking to acquire undergraduate study in the US or an undergraduate student intending to get your masters in the US, or Canada? Well, this is the place to get all the information you need. The Academist is all about providing a helping hand in the society therefore most of our services are free…</Text>
              </View>
            </View>
          </View>
          </ScrollView>
        )
    }
}