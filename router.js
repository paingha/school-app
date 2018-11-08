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
import ScholarshipScreen from "./components/scholarshipSearch";
import GpaScreen from "./components/gpa";
import CalculatorScreen from "./components/calculator";
import RegisteredScreen from "./components/registered";
import SentScreen from "./components/sent";
import FirstLoginScreen from "./components/firstLogin";
import DrawerContainer from './containers/DrawerContainer'
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
const Stack = {
	FirstView: {
		screen: HomeScreen
	},
	SecondView: {
		screen: FirstLoginScreen
  },
  ThirdView: {
		screen: ScholarshipScreen
  },
  FourthView: {
		screen: GpaScreen
  },
  FifthView: {
    screen: CalculatorScreen
  }
};

const DrawerRoutes = {
	FirstViewStack: {
		name: 'FirstViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'FirstView' })
	},
	SecondViewStack: {
		name: 'SecondViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'SecondView' })
  },
  ThirdViewStack: {
		name: 'ThirdViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'ThirdView' })
  },
  FourthViewStack: {
		name: 'FourthViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'FourthView' })
  },
  FifthViewStack: {
		name: 'FifthViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'FifthView' })
	},
};

export const SignedIn = createStackNavigator({
  Drawer: {
    name: 'Drawer',
    screen: createDrawerNavigator(
      DrawerRoutes,
      {
        drawerLockMode: 'locked-closed',
        contentComponent: DrawerContainer
      }
    ),
    
  },
  ...Stack
},
  {
    headerMode: 'none'
  }
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

