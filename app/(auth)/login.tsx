import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(){
	setLoading(true);
	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) Alert.alert(error.message);
	setLoading(false);
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Log in",
          headerTitleStyle: { fontFamily: "mon-sb" },
        }}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="example@example.com"
        value={email}
        onChangeText={setEmail}
        style={[defaultStyles.inputField, { marginBottom: 20 }]}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[defaultStyles.inputField, { marginBottom: 20 }]}
      />
      <TouchableOpacity style={defaultStyles.btn} disabled={loading} onPress={signInWithEmail}>
        <Text style={defaultStyles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/(modals)/reset" asChild>
        <Pressable>
          <Text style={[styles.textBtn, { marginTop: 20, marginBottom: 10 }]}>
            Forgot password?
          </Text>
        </Pressable>
      </Link>
      <Link href="/(auth)/register" asChild>
        <Pressable>
          <Text style={styles.textBtn}>Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

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
});
export default Page;
