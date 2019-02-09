import React from 'react'
import {View, Image, Alert, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');

export default class TermsScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
      screenHeight: height,
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Terms & Conditions',
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
        <View style={{flex:1, flexDirection:'column', marginBottom:15, alignItems:'center', alignContent:'space-between', width:'100%'}}>
          <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Bold', color:'black', marginTop:5}}>The Academist Terms and Conditions</Text>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Regular', paddingHorizontal:15 , marginTop:10}}>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Bold', color:'black'}}>Introduction</Text>
            <Text> {`\n`}{"\n"} </Text>

These Site’s Terms and Conditions shall manage your use of this website. These Terms will be fully applied and determine how you use this Site. In using this Site, you consent to all terms and conditions written in here. You are obliged not use this Website in case of any misunderstanding with any of the mentioned Website Standard Terms.

Minors or individuals below 18 years old are forbidden from this Website.

<Text> {`\n`}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Intellectual Property Rights</Text>
<Text> {`\n`}{"\n"} </Text>

Other than the content you own, under these Terms, The Academist and its licensors own all intellectual property rights and materials within this Website.

You are granted a limited license only permitting viewing of the material contained on this Website.

<Text> {`\n`}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Data Attribution</Text>
<Text> {`\n`}{"\n"} </Text>

Directory Data is copyrighted material under license to Wintergreen Orchard House and which is reproduced by permission of Wintergreen Orchard House. All rights reserved.

<Text> {`\n`}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Restrictions</Text>
<Text> {`\n`}{"\n"} </Text>

The limitations are:
<Text> {`\n`}{"\n"} </Text>

from publishing any material from The Academist in any other media;
from selling, commercializing and sub selling any material from The Academist;
from publicly performing and showing any of The Academist material;
from using The Academist in any way that is or may be damaging to the site;
from using The Academist in any way that impacts user access to the site;
from using The Academist in a way that is against applicable laws and regulations, or in any way may cause harm to the site, or to any individual or business;
from engaging in any data mining activity, data harvesting, data extracting or any other activity that is similar to those above to The Academist
from the use of The Academist for advertising or marketing purposes.
Certain parts of this site are restricted from your access, and The Academist may further restrict your access to any areas of the site, at any time, at the administrator’s absolute discretion. Specific user ID and password created for The Academist are confidential, and confidentiality must exist.

<Text> {`\n`}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Your Content</Text>
<Text> {`\n`}{"\n"} </Text>

In these site’s Terms and Conditions, “Your Content” is referenced to mean any sound clip, visual, images or by extension any other material displayed on the site. By posting Your Content, you grant The Academist a non-exclusive, worldwide, irrevocable, sublicense to utilize, recreate, adapt, print, translate and distribute it in all media.

Your Content must be your own and must not be invading any third-party’s rights. The Academist reserves the inherent right to withdraw any of Your Content from the site at any time without warning.
<Text> {`\n`}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>No warranties</Text>
<Text> {`\n`}{"\n"} </Text>

The Academist is provided “as is,” with all faults, and The Academist express no form of representation or warranty, in any way that is related to the site or the materials contained on the site.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Limitation of liability</Text>
<Text> {`\n`}{"\n"} </Text>

In no event shall The Academist, its officers, its directors, and its employees be held liable for any occurrence from the use of the site whether such liability is under contract. Also, The Academist, its officers, its directors, and its employees will in no way be held liable in the case of any indirect, in consequence, or individual liability from your use of the site.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Indemnification</Text>
<Text> {`\n`}{"\n"} </Text>

You at this moment are indemnified to the fullest extent to The Academist from and against all liabilities, expenses, demands, causes of action, damages and costs related to your actions in breach of any of the provisions given to these Terms and Conditions.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Severability</Text>
<Text> {`\n`}{"\n"} </Text>

If any of the provisions provided in this Terms and Conditions is found to be in contravention under any applicable law, such provisions shall be repealed without affecting the remaining provisions herein.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Variation of Terms</Text>
<Text> {`\n`}{"\n"} </Text>

The Academist can change these Terms and Conditions at the administrator’s discretion, and by using the site, you are expected to review these Terms and Conditions on a regular basis.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Assignment</Text>
<Text> {`\n`}{"\n"} </Text>

The Academist is permitted to assign, transfer, and subcontract its rights, privileges, and obligations under these Terms and Conditions without any notification. However, you as the user are not allowed to assign, transfer, or subcontract any of your rights and obligations under these Terms.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Entire Agreement</Text>
<Text> {`\n`}{"\n"} </Text>

These Terms and Conditions contain the full agreement between The Academist and you as the user about your use of the site and in turn supersede all previous terms of understanding.
<Text> {"\n"}{"\n"} </Text>
<Text style={{fontWeight:'bold', color:'black'}}>Governing Law & Jurisdiction</Text>
<Text> {`\n`}{"\n"} </Text>

These Terms and Conditions will be governed by and interpreted by the constitutional laws of the State of Texas, and as the user, you submit to the non-exclusive jurisdiction of the specified state and federal courts in Texas for the resolution of any disputes.
            </Text>
            <Text> {`\n`}{"\n"} </Text>
            </View>
          </View>
          
        </View>
        </ScrollView>
    )
  }
}
