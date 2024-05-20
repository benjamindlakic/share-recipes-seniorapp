import Colors from "@/constants/Colors";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "@/providers/AuthProvider";

export const LogoutButton = () => {
  // const { signOut } = useAuth();

  // const doLogout = () => {
  //   signOut();
  // };

  return (
    <TouchableOpacity style={styles.logoutBtn}>
      <Ionicons name="log-out-outline" size={24} />
    </TouchableOpacity>
  );
};

const Layout = () => {
  const { session } = useAuth();

  if (!session) {
      return <Redirect href={'/login'}/>;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: { fontFamily: "mon-sb" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        // redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={size} color={color} />
          ),
        }}
        // redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="uploadRecipe"
        options={{
          tabBarLabel: "Add Recipe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
        // redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
    
        }}
        // redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  textBtn: {
    color: Colors.grey,
    fontFamily: "mon-sb",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  logoutBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
});
