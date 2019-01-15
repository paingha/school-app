import React from 'react';
import { StyleSheet, View, Alert, ScrollView, ImageBackground, Text, Image, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, KeyboardAvoidingView  } from 'react-native';
import {login, loginFacebook, loginGoogle} from '../settings'
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import FBSDK, {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import {loginUserCall, facebookLoginUserCall, googleLoginUserCall, clearErrorCall} from '../calls/user';
const { height } = Dimensions.get('window');
class LoginScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            userId: '',
            token: '',
            userInfo: null,
            visible: false,
            screenHeight: height,
        }
    }
    static navigationOptions = {
        header: null
      };
      onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
      };
      async componentDidMount() {
        this._configureGoogleSignIn();
        this.props.clearError();
      }
    
      _configureGoogleSignIn() {
        GoogleSignin.configure({
          webClientId: '746777980095-uedkcnv4qfdg9ss9nb847cgl4o70472q.apps.googleusercontent.com',
          offlineAccess: false,
          forceConsentPrompt: true,
        });
      }
      _signIn = async (e) => {
        try {
          //await GoogleSignin.hasPlayServices();
          await GoogleSignin.signOut();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ email: userInfo.user.email, error: null },()=>{
            //alert(userInfo.user.email)
            this.props.googleLogin(loginGoogle, this.state.email, e)
          });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // sign in was cancelled
            Alert.alert('Login Cancelled', 'Google Login cancelled');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('play services not available or outdated');
          } else {
            Alert.alert('Something went wrong', error.toString());
            this.setState({
              error,
            });
          }
        }
      };
      _fbAuth(e){
        LoginManager.logOut();
        LoginManager.logInWithReadPermissions(['public_profile']).then((res)=>{
          if(res.isCancelled){
            alert('Facebook Login was Cancelled')
          }
          else{
            //console.log(res)
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                //console.log(data)
                this.setState({token: data.accessToken})
                const infoRequest = new GraphRequest(
                  '/me?fields=name,email,first_name, last_name',
                  null,
                  (error, result)=>{
                    if (error) {
                      alert(error.toString());
                    } else {
                      //console.log(result);
                      this.setState({email: result.email, userId: result.id}, ()=>{
                        const {email, userId, token} = this.state;
                        this.props.facebookLogin(loginFacebook, email, userId, token, e)
                      })
                    }
                  },
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
              }
            )
            //call api here
            
            //alert('Login successful' + res.grantedPermissions.toString())
          }
        }, (error) =>{
          Alert.alert('Error', 'An error occured')
        })
      }

  render() {
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width - 30;
    const deviceWidthinner = width - 40;
    const {email, password} = this.state
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ScrollView 
      style={{flex:1, fontFamily: 'AdventPro-Regular',}}
      contentContainerStyle={{flexGrow: 1, alignContent:'center', fontFamily: 'AdventPro-Regular',}}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={this.onContentSizeChange}
      >
      <KeyboardAvoidingView style={{flexGrow:1}} behavior="padding" enabled>
      <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.mainContent}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      <Text style={styles.title}>Login</Text>
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
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
      <View style={{height: 50, width: deviceWidth, fontFamily: 'AdventPro-Medium', color: 'grey', backgroundColor: '#F5F5F5', borderColor: '#F5F5F5', borderWidth: 5, borderRadius: 3}}>
      <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={true}
      spellCheck={false}
      textContentType='password'
      placeholder='Password'
      onChangeText={(password)=> this.setState({password})}
        style={{height: 40, fontFamily: 'AdventPro-Medium', backgroundColor: 'white', width: deviceWidthinner, fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <TouchableHighlight
        onPress={()=> {
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          let e = this.props.navigation;
          this.props.fetchData(login, email, password, e)
        },3000)
        })
        }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 15, width: deviceWidth, elevation: 3, backgroundColor: '#FFBF71', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 25, color: 'white', fontFamily: 'AdventPro-Medium'}}> Login </Text>
        </TouchableHighlight>
        <View style={{marginTop: -10, flexDirection: 'row', marginBottom: 10}}>
        <View style={{marginLeft: 2, paddingRight: 5, height: 47, width: 180}}>
        <TouchableHighlight 
        style={{alignItems: 'center', height: 47, marginBottom: 0, width: 180, elevation: 3, backgroundColor: '#3B5998', paddingBottom: 8, paddingTop: 12}}
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
        <View style={{marginRight: 2, paddingLeft: 5}}>
        <GoogleSigninButton
        style={{ width: 180, height: 51, alignItems: 'center'}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={()=>{
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          let e = this.props.navigation;
          this._signIn(e)
            },3000)
          })
          } }/>
        </View>
        </View>
        <Text style={{alignItems: 'center', fontFamily: 'AdventPro-Regular', fontSize: 18, marginTop: -15, marginBottom: 10, color: '#ffffff'}}>Need an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{fontWeight: 'bold', fontFamily: 'AdventPro-Regular' }}>Register</Text></Text>
        <Text style={{alignItems: 'center', fontFamily: 'AdventPro-Regular', fontSize: 18, marginTop: -15, marginBottom: 10, color: '#ffffff'}}>Locked Out? <Text onPress={() => this.props.navigation.navigate("ForgotPassword")} style={{fontWeight: 'bold', fontSize: 17, fontFamily: 'AdventPro-Bold'}}>Reset Password</Text></Text>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF', fontFamily: 'AdventPro-Regular'}} cancelable={false} animation="fade"/>
      </View>
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
    fontFamily: 'AdventPro-Regular', 
  },
  logo: {
    width: 120,
    height: 145,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'AdventPro-Regular',
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
      facebookLogin: (url, email, userId, accessToken, e) => {
        dispatch(
          facebookLoginUserCall(url, email, userId, accessToken, e)
        );
      },
      googleLogin: (url, email, e) => {
        dispatch(
          googleLoginUserCall(url, email, e)
        );
      },
        fetchData: (url, email, password, e) => 
        {
          if (url && email && password && e) {
            dispatch(
              loginUserCall(url, email, password, e)
            );
          } else {
            alert("Incorrect Login Details")
          }
        }
    };
};
export default connect(mapper, mapDispatchToProps)(LoginScreen);