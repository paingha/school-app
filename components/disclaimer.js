import React from 'react'
import {View, Image, Alert, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');

export default class DisclaimerScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
      screenHeight: height,
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Disclaimer',
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
    const scrollEnabled = this.state.screenHeight > height - 50;
    onContentSizeChange = (contentWidth, contentHeight) => {
      this.setState({ screenHeight: contentHeight });
    };
    return(
      <ScrollView 
        style={{flex:1}}
        contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
        >
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignContent:'space-between', width:'100%'}}>
          <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Bold', color:'black', marginTop:5}}>Disclaimer for The Academist</Text>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Regular', paddingHorizontal:15 , marginTop:10}}>
            For more information or questions about our site’s disclaimer, please feel free to contact us by email at info@theacademist.com

Disclaimers for theacademist.com

All data on this website is published in good faith and for general information purpose only. theacademist.com and not warranty on the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (theacademist.com), is strictly at your risk. theacademist.com will not be liable for any losses and damages in connection with the use of our website.

From The Academist, you can visit other websites through hyperlinks. While we do our best to provide only quality links to ethical websites that are relevant to your interests, we do not control their nature or content. The links are not an implication of our recommendation for their content which is privy to their terms. The links may connect to websites whose owners and content may change without notice without our opportunity to change their ‘bad’ links.

You should also be aware that when leaving our website, other websites have different privacy policies and terms which are not in our control. Please beware of their Privacy Policies and their “Terms and Conditions” before engaging in any business or providing any data.

Consent

In using our website, you at this moment consent to our disclaimer terms and agree to them.

Update

If we make updates, amendments or changes to the disclaimer, those changes will be posted here promptly.
            </Text>
            <Text> {`\n`}{"\n"} </Text>
            </View>
          </View>
          
        </View>
        </ScrollView>
    )
  }
}