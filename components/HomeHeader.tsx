import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const HomeHeader = () => {
  const [active, setActive] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => setActive(0)}>
            <Text
              style={{
                fontFamily: active === 0 ? "mon-sb" : "mon",
                fontSize: 15,
                color: active === 0 ? "#000" : Colors.grey,
              }}
            >
              Recipes For You
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.divider}></Text>
          </View>
          <TouchableOpacity onPress={() => setActive(1)}>
            <Text
              style={{
                fontFamily: active === 1 ? "mon-sb" : "mon",
                fontSize: 15,
                color: active === 1 ? "#000" : Colors.grey,
              }}
            >
              Following Chefs
            </Text>
          </TouchableOpacity>
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
  divider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.primary,
  },
});
export default HomeHeader;
