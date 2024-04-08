import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';



const ProfileHeader = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.logoutBtn}>
                    <Ionicons name='share-social-outline' size={30} color={Colors.primary}></Ionicons>
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
        alignItems: 'flex-end', // Align items to the right side
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Justify content to the right side
        paddingHorizontal: 16,

        paddingTop: 10,
        gap: 10,
    },
    logoutBtn:{
        padding: 10,
    },
})
export default ProfileHeader