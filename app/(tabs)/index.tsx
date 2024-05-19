import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import recipesData from '@/assets/data/recipes.json';
import Recipes from '@/components/Recipes';
import HomeHeader from '@/components/HomeHeader';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';


const Page = () => {
    const items = useMemo(() => recipesData as any, []);
    const { session, loading } = useAuth();

    if(loading){
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }
    return (

        <View style={{flex: 1}}>
            <Stack.Screen
                options={{
                header: () => <HomeHeader />,
            }}
            />
            <View style={{flex: 1, marginTop: 20}}>
                <Recipes recipes={items}/>
            </View>
            
        </View>
    );
};

export default Page;