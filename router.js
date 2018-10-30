import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';

import RegisterScreen from "./components/register";
import ForgotScreen from "./components/forgot";
import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
import RegisteredScreen from "./components/registered";
import SentScreen from "./components/sent";
import FirstLoginScreen from "./components/firstLogin";
//import Profile from "./screens/Profile";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  SignUp: {
    screen: RegisterScreen,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  },
  ForgotPassword: {
    screen: ForgotScreen,
    navigationOptions: {
      title: "Forgot Password",
      headerStyle
    }
  },
  Registered: {
    screen: RegisteredScreen,
    navigationOptions: {
      title: "Registered",
      headerStyle
    }
  },
  Sent: {
    screen: SentScreen,
    navigationOptions: {
      title: "Sent",
      headerStyle
    }
  },
});
const drawerList = [

];
export const drawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions:{
        title: 'Home'
      }
    }
  }, 
  {
    "drawerPosition": "left",
    "drawerWidth": 300,
  }
)

export const SignedIn = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Drawer: {
      screen: drawer
    },
    FirstLogin: {
      screen: FirstLoginScreen,
    }
  },
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

