import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const SearchHeader = () => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.primary}
            onPress={router.back}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={24} color={Colors.primary}></Ionicons>
            <View>
              <TextInput
                style={{ fontFamily: "mon-sb", fontSize: 16 }}
                placeholder="Try 'chicken', 'avocado'"
              ></TextInput>
            </View>
          </TouchableOpacity>
          <Ionicons
            name="close-circle-outline"
            size={24}
            color={Colors.primary}
          ></Ionicons>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 60,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 8,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
export default SearchHeader;
