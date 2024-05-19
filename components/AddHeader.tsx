import { View, Text, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';


  
const AddHeader = () => {
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Text style={[styles.headerText]}>Add recipe</Text>
 
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 60,
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 10,
      paddingTop: 8,
    },
    headerText: {
      fontFamily: 'mon-sb',
      fontSize: 18,
    },
})
export default AddHeader