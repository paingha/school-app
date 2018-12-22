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
import MajorScreen from "./components/major";
import CalculatorScreen from "./components/calculator";
import RegisteredScreen from "./components/registered";
import SentScreen from "./components/sent";
import FirstLoginScreen from "./components/firstLogin";
import DrawerContainer from './containers/DrawerContainer'
import BuyCoinScreen from "./components/buy_coin";
import BlogScreen from "./components/blog";
import BlogDetailScreen from "./components/blogDetail";
import ForumDetailScreen from "./components/forumDetail";
import ForumScreen from "./components/forum";
import AboutScreen from "./components/about";
import LegalScreen from "./components/legal";
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
  },
  SixthView: {
    screen: BuyCoinScreen
  },
  SeventhView: {
    screen: BlogScreen
  },
  EightthView: {
    screen: ForumScreen
  },
  NinethView: {
    screen: AboutScreen
  },
  TenthView: {
    screen: LegalScreen
  },
  BlogDetailView: {
		screen: BlogDetailScreen
  },
  ForumDetailView: {
    screen: ForumDetailScreen
  },
  MajorView: {
    screen: MajorScreen
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
  SixthViewStack: {
		name: 'SixthViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'SixthView' })
  },
  SeventhViewStack: {
		name: 'SeventhViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'SeventhView' })
  },
  EightthViewStack: {
		name: 'EightthViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'EightthView' })
  },
  NinethViewStack: {
		name: 'NinethViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'NinethView' })
  },
  TenthViewStack: {
		name: 'TenthViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'TenthView' })
  },
  EleventhViewStack: {
		name: 'EleventhViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'BlogDetailView' })
  },
  TwelvethViewStack: {
		name: 'TwelvethViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'ForumDetailView' })
  },
  ThirteenthViewStack: {
		name: 'ThirteenthViewStack',
		screen: createStackNavigator(Stack, { initialRouteName: 'MajorView' })
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

