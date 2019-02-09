import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {registerUserCall, facebookRegisterUserCall, googleRegisterUserCall, clearErrorCall} from '../calls/user';
import {register, registerFacebook, registerGoogle} from '../settings'
import Icon from 'react-native-vector-icons/FontAwesome';
import FBSDK, {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { StyleSheet, ImageBackground, ScrollView, View, Alert, Text, Image, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, KeyboardAvoidingView  } from 'react-native';
const { height } = Dimensions.get('window');
import CheckBox from './checkbox';
import Modal from 'react-native-modalbox';
import { WebView } from "react-native-webview";
class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
      };
  constructor(props){
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      userId: '',
      visible: false,
      checkSelected: false,
      userInfo: null,
      screenHeight: height,
    }
  }
  async componentDidMount() {
    this._configureGoogleSignIn();
    this.props.clearError();
  }
  toggleCheckBox = (isCheck) => {
    this.setState({ checkSelected: isCheck });
    }

  
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '638073687773-flr8fq4sifc9eue2bs4001dr23rjjtb4.apps.googleusercontent.com',
      offlineAccess: false,
      forceConsentPrompt: true,
    });
  }
  _googleSignIn = async (e) =>{
    try {
      const userInfo = await GoogleSignin.signIn();
      this.setState({ email: userInfo.user.email, firstName: userInfo.user.givenName, lastName: userInfo.user.familyName, error: null },()=>{
        alert(userInfo.user.email)
        const {email, firstName, lastName} = this.state;
        this.props.googleRegister(registerGoogle, email, firstName, lastName, e)
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  }
  _fbAuth(e){
    LoginManager.logInWithReadPermissions(['public_profile']).then((res)=>{
      if(res.isCancelled){
        alert('Facebook Register was cancelled')
      }
      else{
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            this.setState({token: data.accessToken})
            const infoRequest = new GraphRequest('/me', { parameters: { fields: { string: 'email,name,first_name,last_name' } } },
              (error, result)=> {
                if (error) {
                  alert(error.toString());
                } else {
                  //console.log(result);
                  this.setState({email: result.email, userId: result.id, firstName: result.first_name, lastName: result.last_name}, ()=>{
                    const {email, firstName, lastName, userId, token} = this.state;
                        this.props.facebookRegister(registerFacebook, email, firstName, lastName, userId, token, e)
                  })
                }
              },
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          }
        )
      }
    }, (error) =>{
      alert('An error occured')
    })
  }

  render() {
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width - 30;
    const deviceWidthinner = width - 40;
    const {email, password, confirmPassword, firstName, lastName} = this.state
    const scrollEnabled = this.state.screenHeight > height - 150;
    const BContent = <Icon style={[styles.btn, styles.btnModal]} name='close' size={30} color="#085078" />;
    
    return (
      <ScrollView 
      style={{flex:1}}
      contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={this.onContentSizeChange}
      >
      <KeyboardAvoidingView style={{flexGrow:1}} behavior="padding" enabled>
    <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.mainContent}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      <Text style={styles.title}>Create An Account</Text>
      {
        this.props.error?
        <View style={{flexDirection:'column', padding:10, marginBottom: 6, flexWrap:'wrap', alignContent:'center', alignItems:'center', justifyContent:'space-between', maxWidth:'95%'}}>
         <Icon style={{textAlign: 'center', fontWeight: 200, marginBottom:7}} name="exclamation-triangle" size={18} color="red" />
        <View style={{flexWrap:'wrap', maxWidth:'100%'}}>
        <Text style={{color: 'red', fontSize:16, flexWrap:'wrap', fontFamily: 'AdventPro-Regular'}}>{this.props.error}</Text>
        </View>
        </View>
        :
        null
      }
      <View style={{height: 50, width: deviceWidth, fontFamily: 'AdventPro-Medium', color: 'grey', backgroundColor: '#F5F5F5', borderColor: '#F5F5F5', borderWidth: 5, borderRadius: 3}}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        spellCheck={false}
        textContentType='givenName'
        placeholder='First Name'
        onChangeText={(firstName)=> this.setState({firstName})}
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 16, paddingBottom: 1, paddingTop: 1, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <View style={{height: 50, width: deviceWidth, fontFamily: 'AdventPro-Medium', color: 'grey', backgroundColor: '#F5F5F5', borderColor: '#F5F5F5', borderWidth: 5, borderRadius: 3}}>
      <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      spellCheck={false}
      textContentType='familyName'
      placeholder='Last Name'
      onChangeText={(lastName)=> this.setState({lastName})}
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 16, paddingBottom: 1, paddingTop: 1, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <View style={{height: 50, width: deviceWidth, fontFamily: 'AdventPro-Medium', color: 'grey', backgroundColor: '#F5F5F5', borderColor: '#F5F5F5', borderWidth: 5, borderRadius: 3}}>
      <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      spellCheck={false}
      textContentType='emailAddress'
      placeholder='Email'
      onChangeText={(email)=> this.setState({email})}
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 16, paddingBottom: 1, paddingTop: 1, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <View style={{height: 50, marginBottom: 0, fontFamily: 'AdventPro-Medium', width: deviceWidth, color: 'grey', backgroundColor: '#F5F5F5', borderColor: '#F5F5F5', borderWidth: 5, borderRadius: 3}}>
      <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={true}
      spellCheck={false}
      textContentType='password'
      placeholder='Password'
      onChangeText={(password)=> this.setState({password})}
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 16, paddingBottom: 1, paddingTop: 1, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <View style={{flexDirection: 'row', maxWidth: '100%', marginBottom: 0}}>
      <CheckBox style={{marginTop: 0, padding: 0,}} clicked={(isCheck) => this.toggleCheckBox(isCheck)}></CheckBox>
      <View style={{flexDirection: 'row', maxWidth: '75%', alignSelf:'center'}}>
      <Text style={{color: '#ffffff', fontSize: 18, fontFamily: 'AdventPro-Regular', }}>By signing up you agree to our <Text onPress={()=> this.refs.webViewModalTerms.open()} style={{textDecorationLine: 'underline'}}>Terms and Conditions</Text> and <Text onPress={()=> this.refs.webViewModalPrivacy.open()} style={{textDecorationLine: 'underline'}}>Privacy Policy</Text></Text>
      </View>
      </View>
      <TouchableHighlight
        onPress={()=> {
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
            let e = this.props.navigation;
            this.props.fetchData(register, email, password, firstName, lastName, e, this.state.checkSelected)
            },3000)
          })
        }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 10, width: deviceWidth, elevation: 3, backgroundColor: '#FFBF71', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 25, color: 'white', fontFamily: 'AdventPro-Medium'}}> Register </Text>
        </TouchableHighlight>
        <View style={{marginTop: -15, flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
        <View style={{paddingRight: 5}}>
        <TouchableHighlight 
        style={{alignItems: 'center', height: 48, marginBottom:0, width: 170, elevation: 3, backgroundColor: '#3B5998', paddingBottom: 8, paddingTop: 12}}
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          let e = this.props.navigation;
          this._fbAuth(e)
        },3000)
        })
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Icon style={{textAlign: 'center', paddingBottom: 10, paddingRight: 10}} name="facebook-square" size={30} color="#ffffff" />
          <Text style={{fontSize: 20, color: 'white'}}>
            Facebook
          </Text>
        </View>
        </TouchableHighlight>
        </View>
        <View style={{paddingLeft: 5}}>
        <GoogleSigninButton
        style={{ width: 180, height: 51, alignItems: 'center' }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          let e = this.props.navigation;
          this._googleSignIn(e)
            },3000)
          })
          } }/>
        </View>
        </View>
        <Text style={{alignItems: 'center', fontFamily: 'AdventPro-Regular', fontSize: 18, marginTop: -5, marginBottom: 5, color: '#ffffff'}}>Already have an account? <Text onPress={() => this.props.navigation.navigate("SignIn")} style={{fontWeight: 'bold', fontSize: 17}}>Login</Text></Text>
        <Text style={{alignItems: 'center', fontFamily: 'AdventPro-Regular', fontSize: 18, marginTop: -15, marginBottom: 10, color: '#ffffff'}}>Locked Out? <Text onPress={() => this.props.navigation.navigate("ForgotPassword")} style={{fontWeight: 'bold', fontSize: 17}}>Reset Password</Text></Text>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
    </ImageBackground>
    </KeyboardAvoidingView>
    <Modal 
          style={[styles.modal, styles.modal5]}
          position={"center"}
          ref={"webViewModalTerms"} 
          swipeToClose={false}
          backdropContent={BContent}
        >
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
        </Modal>
        <Modal 
          style={[styles.modal, styles.modal5]}
          position={"center"}
          ref={"webViewModalPrivacy"} 
          swipeToClose={false}
          backdropContent={BContent}
        >
        <ScrollView 
        style={{flex:1}}
        contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={this.onContentSizeChange}
        >
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignContent:'space-between', width:'100%'}}>
          <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Bold', color:'black', marginTop:5}}>The Academist Privacy Policy</Text>
            <Text style={{fontSize: 18, fontFamily:'AdventPro-Regular', paddingHorizontal:15 , marginTop:10}}>
            This privacy policy compilation is a service to those who mind on how their ‘Personally Identifiable Information’ (PII) is used on the internet. PII is described in the US privacy law and information security as the information usable individually or with more data to identify, contact, or locate an individual or in context. Please peruse through our privacy policy in detail to clearly understand how we collect, use, protect or otherwise handle what you offer as Personally Identifiable Information by within the website.

What kind of personal information do we require from the people that visit our site?

When ordering or registering on The Academist, in context, we may need details such as names, email and mail address, phone number, credit card information or other details to optimize your interaction with the website.

At what point do we collect your information?

We collect information from you when you register on our site or enter data on to the website.

What do we do with the data you provide?

Some of the uses of the information you provide us through registration, purchase a subscription, respond our marketing circulars, explore the website, or use the website features in the following ways:

To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.
Receiving information about our services through regular emails.
Follow up with subscribers with correspondence in the form of live chat, email or phone inquiries.
How do we take care of the data you provide?

Our website is scanned on a regular basis for loopholes and vulnerabilities to make sure our site is very safe.

We regularly scan for Malware.

Your personal data is secured by networks, and only accessible by a few people with have special access rights that are defined in the system and are obligated to keep the information confidential. Also, all sensitive data such as credit information supplied uses Secure Socket Layer (SSL) encryption.

There are additional security measures implemented when users enter, submit, or accesses their data to ensure the safety of personal data.

All transactions use a gateway provider to process data and neither stored nor handled by our web servers.

Does our website use cookies?

The Academist does use cookies which are small files that sites or service providers send to your device hard drive through your browser (with permission) allowing for the recognition of your browser to capture and remember certain key personal data. One example is the use of cookies to help identify most requested services from The Academist. Cookies also help us compile and aggregate data about The Academist traffic and what users interact with to offer a better experience and tools in the future.

We use cookies to:

Understand and save user’s preferences for future visits.
Compile aggregate data about The Academist traffic and site interactions to offer a better experience and tweaks for the future communications. We may also use trusted third-party services to track such data on our behalf.
You can choose to have your computer warn you each time a cookie is sent, or you the choice to turn off all cookies. You do this through your browser settings. Since the browser is a little different, look through the browser’s Help Menu to learn how to modify the movement of cookies.

What happens when you disable cookies:

Turning cookies off make some of the features making your site experience less effective and function poorly.

Third-party disclosure Agreement

We neither sell, trade nor transfer to outside parties your Personally Identifiable Information unless we provide users with notice. The clause excludes website hosting partners or parties who are assisting in website operations, conducting website business, or user service, albeit with a confidentiality agreement. We are also privy to release information in cases where it follows the state law, enforce site policies, or protect rights, personal property, and safety.

However, in the case of non-personally identifiable visitor information, it may be given to external parties for purposes of marketing, advertisement, or for other uses.

Third-party links on The Academist

At our discretion, we may occasionally offer third-party products or services on The Academist. These websites have separate, unique and specific privacy policies outlined in their context. The implication is we have no responsibility, input or liability for their content. Nonetheless, we endeavor to protect the integrity of The Academist and open to feedback about these third-party links.

Google Relationship

Google’s advertising details outlined is in Google’s Advertising Principles. They are intended for positive user experience and are found at https://support.google.com/adwordspolicy/answer/1316548?hl=en

The Academist uses Google AdSense Advertising.

Google is a third-party vendor utilizing cookies to serve adverts on The Academist. Google’s use of DART cookie enables ad service to our users based on their type of visits on the internet. Users can opt-out from DART cookie by changing preferences at Google Advertisement and Content Network Privacy Policy.

The Academist implements:

Re-marketing with Google’s AdSense
Reporting through Google Display Network Impression
Reports on Demographics and Interests
DoubleClick Platform Integration
In conjunction with third-party vendors such as Google, we utilize first-party cookies like Google Analytic cookies, third-party cookies such as DoubleClick cookie or other third-party identifiers. We use them together to gather data on user impressions and ad interactions with other ad services about The Academist.

How to Opt-out:

Internet users can control their preferences on Google advertisements by using the Google Ad Settings page. Alternatively, you can opt-out by visiting the Network Advertising Initiative Opt-Out page or by using the Google Analytics Opt-Out Browser Add-on.

California Online Privacy Protection Act Provisions:

CalOPPA is one of the first state laws in the United States that require mandated commercial websites and online services to post their particular privacy policy. The law has a far-reaching mandate stretching beyond the state of California. It requires that any person or company around the world that is operating websites and also collecting PII from California residents to submit a clear and concise privacy policy as part of the website. It is mandated to state the exact type of data of collected and which individuals or companies are privy to it. –

For more details visit http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf

The CalOPPA Act defines the following for The Academist:

Users can legally explore The Academist anonymously.

On the creation of The Academist’s privacy policy, it will have a link on our home page to access it, or at the very minimum, it will be the first significant page after entering The Academist.

The Academist’s Privacy Policy link shall include the term ‘Privacy’ for easy access on the page specified above.

The Academist is duly obliged to notify of any Privacy Policy changes:

On our Privacy Policy Page
Users can modify personal information:

By logging in to your account
How does The Academist manage Do Not Track signals?

The Academist duly honors any Do Not Track signals, plant cookies, nor use any advertising in case a Do Not Track browser mechanism is detected.

Does the Academist permit behavioral tracking by Third-parties?

An important point of note is that we do not allow behavioral tracking by Third-Parties

COPPA (Children Online Privacy Protection Act)

Parents are under control in the case of the collection of personal information from children under the age of 13 years old according to laws mandated by Children’s Online Privacy Protection Act (COPPA). The FTC, which is a consumer protection agency is the body charged with enforcing the COPPA Rule. The rule defines the requirements from websites operators and online services what is required from them on privacy and safety of children online.

The Academist does not specifically market its services to children under 13 years of age.

 

Fair Information Practices

The Fair Information Practices Principles can be defined as the fundamental principles of privacy law in the United States. The concepts play a significant role in the definition of data protection laws all over the world. It is important to comprehend what the Fair Information Practice Principles are and how their implication is necessary for compliance with the various privacy laws that protect personal information.

To be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:

We will notify you via email

Within one working day
The Academist agree to the Individual Redress Principle which states that individuals are legally obliged to pursue their enforceable rights as litigation against data collectors or processors who do not adhere to the stated law. The principle postulates that individuals can not only use their enforceable rights against those who use their data unlawfully but also that individuals have recourse to courts or government agencies to investigate and prosecute non-compliance by data processors.

CAN-SPAM Act

The CAN-SPAM Act is legislation that sets the rules of engagement for commercial email, establishing what is required for commercial messages, giving recipients a right to stop emails sent to them, and detail out severe penalties for violations.

We collect your email address to:

Send information, respond to inquiries, and other requests or questions
 

To be by CANSPAM compliant, we submit to the following laws:

Avoid the use of false or misleading topics or email subjects.
Differentiate the subject with advertisement content in reasonably.
Include information about the physical address of the main website offices.
Observe and manage third-party email marketing to ensure compliance, if they are on the website used.
Honor opt-out/unsubscribe choice from users promptly.
Create the option to unsubscribe by using a link at the bottom of each email for users.
For the Academist, the link below emails will be phrased this way: ‘If at any point you would prefer to unsubscribe and not receive future emails, you can email us at [email protected]’

Following the set instructions at the bottom of each email, we will remove you from ALL correspondence as soon as we can.
 

 

 

Contact Us

For any queries about this privacy policy, you may contact us using the information below.

theacademist.com

Richmond, Texas 77407

United States

[email protected]

 

Last Edited on 2017-05-07
            </Text>
            <Text> {`\n`}{"\n"} </Text>
            </View>
          </View>
          
        </View>
        </ScrollView>
        </Modal>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#86e2d5',
  },
  logo: {
    width: 80,
    height: 105,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontFamily: 'AdventPro-Regular',
  },
  title: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 3,
    marginTop: -10,
    fontFamily: 'AdventPro-Regular'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 250
  },
  modal5: {
    height: 400
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
      is_fetching: state.user.is_fetching,
      error: state.user.error,
      redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () =>
    {
      dispatch(
        clearErrorCall()
      )
    },
    facebookRegister: (url, email, firstName, lastName, userId, token, e) => 
      {
        dispatch(
          facebookRegisterUserCall(url, email, firstName, lastName, userId, token, e)
        );
      },
      googleRegister: (url, email, firstName, lastName, e) => 
      {
        dispatch(
          googleRegisterUserCall(url, email, firstName, lastName, e)
        );
      },
      fetchData: (url, email, password, firstName, lastName, e, agree) => 
      {
        if(agree){
        if (url && email && password && firstName && lastName && e) {
          dispatch(
            registerUserCall(url, email, firstName, lastName, password, e)
          );
        } else {
          alert("Required Details Missing")
        }
      
      }else {
      Alert.alert("Error", "Agreeing to our Terms and Conditions and Privacy Policy is required")
    }
    }
  };
};
export default connect(mapper, mapDispatchToProps)(RegisterScreen);