import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {forgotUserCall} from '../calls/user';
import {forgot} from '../settings'
import { StyleSheet, View, ImageBackground, Text, Image, TextInput, Dimensions, TouchableHighlight, KeyboardAvoidingView  } from 'react-native';

class ForgotScreen extends React.Component {
    static navigationOptions = {
        header: null
      };
  constructor(props){
    super(props)
    this.state = {
      email: '',
      visible: false
    }
  }
  render() {
    const {height, width} = Dimensions.get('window');
    const deviceWidth = width - 30;
    const deviceWidthinner = width - 40;
    const {email} = this.state
    return (
      <ImageBackground source={require('../assets/login-bg.jpg')} style={styles.mainContent}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      <Text style={styles.title}>Reset Password</Text>
      <View style={{height: 50, width: deviceWidth, color: 'grey', backgroundColor: '#F5F5F5', borderColor: '#F5F5F5', borderWidth: 5, borderRadius: 3}}>
      <TextInput
      autoCapitalize='none'
      autoCorrect={false}
      spellCheck={false}
      textContentType='emailAddress'
      placeholder='Email'
      onChangeText={(email)=> this.setState({email})}
        style={{height: 40, backgroundColor: 'white', width: deviceWidthinner, fontFamily: 'AdventPro-Medium', fontSize: 20, paddingBottom: 8, paddingTop: 12, paddingRight: 20, paddingLeft: 20, color: 'grey', borderColor: '#ccc', borderWidth: 1}}
      />
      </View>
      <TouchableHighlight
        onPress={()=> {
          this.setState({visible: true}, ()=>{
            setTimeout(()=>{
            this.setState({visible: false})
          let e = this.props.navigation;
          this.props.fetchData(forgot, email, e)
        },3000)
      })
        }
      }
         style={{alignItems: 'center', height: 50, marginBottom: 25, width: deviceWidth, elevation: 3, backgroundColor: '#FFBF71', paddingBottom: 8, paddingTop: 12}}
        >
         <Text style={{fontSize: 25, fontFamily: 'AdventPro-Medium', color: 'white'}}> Reset Password </Text>
        </TouchableHighlight>
        <Text style={{alignItems: 'center', fontFamily: 'AdventPro-Regular', fontSize: 18, marginTop: -15, marginBottom: 10, color: '#ffffff'}}>Already have an account? <Text onPress={() => this.props.navigation.navigate("SignIn")} style={{fontWeight: 'bold'}}>Login</Text></Text>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
    </ImageBackground>
    
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
  },
  title: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'AdventPro-Regular'
  }
});

function mapper(state) {
  return {
      is_fetching: state.user.is_fetching,
      error: state.user.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url, email, e) => 
      {
        if (email) {
          dispatch(
            forgotUserCall(url, email, e)
          );
        } else {
          alert("Email is missing")
        }
      }
  };
};
export default connect(mapper, mapDispatchToProps)(ForgotScreen);