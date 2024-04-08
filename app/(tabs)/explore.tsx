import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Recipes";
import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Page = () => {
    const { user } = useUser();

    return (
        <View style={{ flex: 1 }}>
        <Stack.Screen
            options={{
            header: () => <ExploreHeader />,
            }}
        />

        <Text style={{marginTop: 100}}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </View>
    );
};

export default Page;