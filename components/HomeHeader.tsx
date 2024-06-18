import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const HomeHeader = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 18,
                color: "#000",
              }}
            >
              Recipes For You
            </Text>
          </TouchableOpacity>
          <View style={styles.underline} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 60,
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 25,
  },
  underline: {
    position: 'absolute',
    bottom: -10,
    height: 2,
    width: '10%',
    backgroundColor: Colors.primary,
  },
});
export default HomeHeader;
