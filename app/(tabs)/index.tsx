import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import recipesData from '@/assets/data/recipes.json';
import Recipes from '@/components/Recipes';
import HomeHeader from '@/components/HomeHeader';
import { Stack } from 'expo-router';


const Page = () => {
    const items = useMemo(() => recipesData as any, []);

    return (


        <View style={{flex: 1}}>
            <Stack.Screen
                options={{
                header: () => <HomeHeader />,
            }}
            />
            <View style={{flex: 1, marginTop: 45}}>
                <Recipes recipes={items}/>
            </View>
            
        </View>
    );
};

export default Page;