import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

  
const AddHeader = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={{fontFamily: 'mon-sb', fontSize: 24, textAlign: 'center', 
            paddingTop: 15}}>
                Add your recipe</Text>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 60,
    },
})
export default AddHeader