import React from 'react'
import {Text, View, StyleSheet} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

export default function LinearGradient(props){
        return(
            <LinearGradient
            style={[styles.mainContent, {
                paddingTop: props.topSpacer,
                paddingBottom: props.bottomSpacer,
                width: props.width,
                height: props.height,
            }]}
            colors={props.colors}
            start={{x: 0, y: .1}} end={{x: .1, y: 1}}
            >
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            </LinearGradient>
        );
}
const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    image: {
      width: 320,
      height: 320,
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
  