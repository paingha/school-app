import React from 'react'
import {View, Image, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LegalScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: 'Legal',
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
      fontWeight: 'bold',
      textAlign: 'center'
    },
  }
  };


    render(){
        return(
            <View>
                
            </View>
        )
    }
}