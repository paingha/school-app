import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NavCard extends React.Component {
  render() {
    return (
    <TouchableOpacity onPress={()=> this.props.pressed}>
    <View style={{flex: 1, justifyContent: 'center', textAlign:'center', alignItems:'center', flexDirection: 'column', marginRight: 10, marginLeft: 10, marginTop: 25, marginBottom: 15, width: this.props.width, height: this.props.height, backgroundColor: '#ffffff', elevation: 3}}>
       <Icon style={{textAlign: 'center'}} name={this.props.icon} size={30} color="#085078" />
       <Text style={{textAlign: 'center', color:'#211a23', flexWrap: 'wrap', fontSize: 15, fontWeight:'bold'}}>{this.props.title}</Text>
       <Text style={{textAlign: 'center', flexWrap: 'nowrap', fontSize: 14}}>{this.props.resp}</Text>
    </View>
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 140,
    height: 165,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  }
});