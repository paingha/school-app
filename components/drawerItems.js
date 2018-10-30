import React from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation';

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = CustomDrawerContentComponent;