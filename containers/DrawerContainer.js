import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('FirstViewStack')}
          style={styles.uglyDrawerItem}>
          Dashboard
        </Text>
        <Text
          onPress={() => navigation.navigate('ThirdViewStack')}
          style={styles.uglyDrawerItem}>
          Scholarship Search
        </Text>
        <Text
          onPress={() => navigation.navigate('FourthViewStack')}
          style={styles.uglyDrawerItem}>
          School Search by GPA
        </Text>
        <Text
          onPress={() => navigation.navigate('SecondViewStack')}
          style={styles.uglyDrawerItem}>
          School Search by Major
        </Text>
        <Text
          onPress={() => navigation.navigate('FifthViewStack')}
          style={styles.uglyDrawerItem}>
          GPA Calculator
        </Text>
        <Text
          onPress={() => navigation.navigate('SecondViewStack')}
          style={styles.uglyDrawerItem}>
          Buy Coins
        </Text>
        <Text
          onPress={() => navigation.navigate('SecondViewStack')}
          style={styles.uglyDrawerItem}>
          About Us
        </Text>
        <Text
          onPress={() => navigation.navigate('SecondViewStack')}
          style={styles.uglyDrawerItem}>
          Legal 
        </Text>
        <Text
          onPress={()=>alert('logout')}
          style={styles.uglyDrawerItem1}>
          Log Out
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 15,
    margin: 5,
    textAlign: 'center'
  },
  uglyDrawerItem1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})