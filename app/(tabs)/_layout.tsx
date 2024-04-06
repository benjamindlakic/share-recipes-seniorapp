import Colors from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
    return (
        <Tabs 
        screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarLabelStyle: { fontFamily: 'mon-sb' },
            }}>
            <Tabs.Screen name="index" options={{ 
                tabBarLabel: 'Feed', 
                tabBarIcon: ({color, size}) =>
                <Ionicons name="home-outline" size={size} color={color} /> 
                }}/> 
            <Tabs.Screen name="explore" options={{ 
                tabBarLabel: 'Explore', 
                tabBarIcon: ({color, size}) =>
                <Ionicons name="search-outline" size={size} color={color} /> 
                }}/> 
            <Tabs.Screen name="upload-recipe" options={{ 
                tabBarLabel: 'Upload Recipe', 
                tabBarIcon: ({color, size}) =>
                <Ionicons name="add-circle-outline" size={size} color={color} />
                }}/> 
            <Tabs.Screen name="profile" options={{ 
                tabBarLabel: 'Profile', 
                tabBarIcon: ({color, size}) =>
                <Ionicons name="person-outline" size={size} color={color} />
                }}/> 
        </Tabs>
       );
};

export default Layout