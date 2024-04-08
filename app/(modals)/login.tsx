import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, router, useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.push("/(tabs)/explore");
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];
    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log(createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error("OAuth error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="example@example.com"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={[defaultStyles.inputField, {marginBottom: 20}]}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[defaultStyles.inputField, {marginBottom: 20}]}
      />
      <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/(modals)/reset" asChild>
				<Pressable>
					<Text style={[styles.textBtn, {marginTop: 20, marginBottom: 10}]}>Forgot password?</Text>
				</Pressable>
			</Link>
			<Link href="/(modals)/register" asChild>
				<Pressable>
					<Text style={styles.textBtn}>Create Account</Text>
				</Pressable>
			</Link>

      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
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
