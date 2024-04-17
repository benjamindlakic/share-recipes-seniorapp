import { View, Text, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

  
const AddHeader = () => {

  const handleSavePress = () => {
    if (true) {
      Alert.alert('Success!', 'Your recipe has been saved successfully.');
      // onSaveChanges?.();
    } else {
      Alert.alert('Error', 'Please ensure all required fields are filled correctly.');
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Text style={[styles.headerText]}>Add recipe</Text>
          <TouchableOpacity style={styles.btnSave} onPress={handleSavePress}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
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
    btnSave: {
      backgroundColor: Colors.primary,
      borderRadius: 32,
      height: 40,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
      left: 150,
    },
    btnText: {
      color: '#fff',
      fontFamily: 'mon-b',
      fontSize: 16
    },
    headerText: {
      fontFamily: 'mon-sb',
      fontSize: 18,
    },
})
export default AddHeader