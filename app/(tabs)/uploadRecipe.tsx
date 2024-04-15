import React from 'react';
import { View, Text,  } from 'react-native';
import { Stack } from "expo-router";
import AddHeader from '@/components/AddHeader';

const Page = () => {
    return (
        <View style={{ flex: 1 }}>
        <Stack.Screen
            options={{
            header: () => <AddHeader />,
            }}
        />
        </View>
    );
};

export default Page;