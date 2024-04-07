import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import recipesData from '@/assets/data/recipes.json';
import Recipes from '@/components/Recipes';


const Page = () => {
    const items = useMemo(() => recipesData as any, []);

    return (
        <View style={{flex: 1, marginTop: 50}}>
            <Recipes recipes={items}/>
        </View>
    );
};

export default Page;