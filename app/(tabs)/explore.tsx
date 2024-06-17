import ExploreHeader from "@/components/ExploreHeader";
import { Stack } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Recipes from "@/components/TrendingRecipes";
import Animated from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRecipeList } from "@/api/recipes";

const Page = () => {
  const { data: items, error, isLoading } = useRecipeList();  

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Animated.ScrollView>
      <View style={{ flex: 1, marginTop: 30, }}>
        <View style={{ justifyContent: "center",}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{ fontFamily: "mon-sb", fontSize: 18, backgroundColor: 'transparent', paddingHorizontal: 15 }}>
                Take a look at trending recipes
                </Text>
                <Ionicons name="flame" size={22} color={Colors.primary} style={{position: 'absolute', right: 15}} />   
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <Recipes recipes={items} />
            </ScrollView>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text style={{ fontFamily: "mon-sb", fontSize: 18, backgroundColor: 'transparent', paddingHorizontal: 15 }}>
                Follow some of our best chefs
                </Text>
                <MaterialCommunityIcons name="chef-hat" size={22} color={Colors.primary} style={{position: 'absolute', right: 15}} />   
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }} style={styles.profileImage} />
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14, textAlign: 'center', marginTop: 5}}>Benjamin Dlakic</Text>
                    <Text style={{ fontFamily: "mon", fontSize: 12, textAlign: 'center', marginTop: 5}}>12K Followers</Text>
                </View>
                <View style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }} style={styles.profileImage} />
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14, textAlign: 'center', marginTop: 5}}>Tarik Karahodzic</Text>
                    <Text style={{ fontFamily: "mon", fontSize: 12, textAlign: 'center', marginTop: 5}}>12K Followers</Text>
                </View>
                <View style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }} style={styles.profileImage} />
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14, textAlign: 'center', marginTop: 5}}>Amir Basovic</Text>
                    <Text style={{ fontFamily: "mon", fontSize: 12, textAlign: 'center', marginTop: 5}}>12K Followers</Text>
                </View>
                <View style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }} style={styles.profileImage} />
                    <Text style={{ fontFamily: "mon-sb", fontSize: 14, textAlign: 'center', marginTop: 5}}>Kerim Sabic</Text>
                    <Text style={{ fontFamily: "mon", fontSize: 12, textAlign: 'center', marginTop: 5}}>12K Followers</Text>
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', marginTop: 15}}>
                <Text style={{ fontFamily: "mon-sb", fontSize: 18, backgroundColor: 'transparent', paddingHorizontal: 15 }}>
                Low calories recipes
                </Text>
                <Ionicons name="nutrition" size={22} color={Colors.primary} style={{position: 'absolute', right: 15}} />   
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <Recipes recipes={items} />
            </ScrollView>
        </View>
      </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 60,
        marginTop: 10,
        padding: 16,
      },
})
