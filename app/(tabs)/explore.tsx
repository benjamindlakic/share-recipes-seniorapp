import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Recipes";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const Page = () => {
    return (
        <View style={{ flex: 1 }}>
        <Stack.Screen
            options={{
            header: () => <ExploreHeader />,
            }}
        />
        </View>
    );
};

export default Page;