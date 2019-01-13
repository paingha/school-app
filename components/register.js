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
            const infoRequest = new GraphRequest(
              '/me?fields=name,email,first_name, last_name',
              null,
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
        <View style={{flexDirection:'column', padding:10, marginBottom: 6, flexWrap:'wrap', alignContent:'center', alignItems:'center', justifyContent:'space-between', maxWidth:'95%', backgroundColor:'red'}}>
         <Icon style={{textAlign: 'center', fontWeight: 200, marginBottom:7}} name="exclamation-triangle" size={18} color="#ffffff" />
        <View style={{flexWrap:'wrap', maxWidth:'100%'}}>
        <Text style={{color: '#ffffff', fontSize:16, flexWrap:'wrap', fontFamily: 'AdventPro-Regular'}}>{this.props.error}</Text>
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
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
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
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
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
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
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
        style={{height: 40, backgroundColor: 'white', fontFamily: 'AdventPro-Medium', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <View style={{flexDirection: 'row', maxWidth: '100%', marginBottom: 0}}>
      <CheckBox style={{marginTop: 0, padding: 0,}} clicked={(isCheck) => this.toggleCheckBox(isCheck)}></CheckBox>
      <View style={{flexDirection: 'row', maxWidth: '75%', alignSelf:'center'}}>
      <Text style={{color: '#ffffff', fontSize: 18, fontFamily: 'AdventPro-Regular', }}>By signing up you agree to our Terms and Conditions and Privacy Policy</Text>
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
  }
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