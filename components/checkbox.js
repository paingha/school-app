import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {isCheck: false};
  }

  checkClicked = async () => {
    await this.setState(prevState => ({
      isCheck: !prevState.isCheck,
    })); // setState is async function.

    // Call function type prop with return values.
    this.props.clicked && this.props.clicked(this.state.isCheck);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.checkClicked} style={this.props.style}>
        <View style={{
          height: 64,
          width: 64,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!this.state.isCheck?
          <View style={{
            height: 20,
            width: 20,
            backgroundColor: '#FFF'
          }} />
          :
        <View style={{
            height: 20,
            width: 20,
            backgroundColor: '#FFF'
          }}>
            <Icon style={{textAlign: 'center', fontWeight: 200}} name="check" size={18} color="black" />
        </View>
        }
        </View>
        
      </TouchableOpacity>
    )
  }
}