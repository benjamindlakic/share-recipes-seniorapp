import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';



const ExploreHeader = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Link href={'/(modals)/search'} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name='search' size={24}></Ionicons>
                        <View>
                            <Text style={{fontFamily: 'mon-sb'}}>Search</Text>
                            <Text style={{fontFamily: 'mon', color: Colors.grey }}>Recipes · Chefs</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name='options-outline' size={24}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 90,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 10,
        gap: 10,
    },
    filterBtn:{
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: '#c2c2c2',
        borderWidth: StyleSheet.hairlineWidth,
        flex:1, 
        padding: 14,
        borderRadius: 30,
        backgroundColor: '#fff',

        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
       },
})
export default ExploreHeader