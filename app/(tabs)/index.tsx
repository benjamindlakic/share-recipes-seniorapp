import React, { useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Recipes from '@/components/Recipes';
import HomeHeader from '@/components/HomeHeader';
import { Redirect, Stack, useFocusEffect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { useRecipeList } from '@/api/recipes';

const Page = () => {
    const { session, loading } = useAuth();

    const { refetch } = useRecipeList();

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );

    if(loading){
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!session) {
        return <Redirect href={'/login'} />;
    }
    return (

        <View style={{flex: 1}}>
            <Stack.Screen
                options={{
                header: () => <HomeHeader />,
            }}
            />
            <View style={{flex: 1, marginTop: 20}}>
                <Recipes/>
            </View>
            
        </View>
    );
};

export default Page;