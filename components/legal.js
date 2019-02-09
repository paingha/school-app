import React from 'react'
import {View, Image, Alert, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');

export default class LegalScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
      screenHeight: height,
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Privacy Policy',
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
    )
  }
}