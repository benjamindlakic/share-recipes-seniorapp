import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useState } from "react";
import { Link, Stack, router } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from '@/lib/supabase';

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail(){
	setLoading(true);
	const { error } = await supabase.auth.signUp({ email, password  });

	if (error) Alert.alert(error.message);
	setLoading(false);
  }

return (
	<View style={styles.container}>
		<Stack.Screen
			options={{
				title: "Create your account",
				headerTitleStyle: { fontFamily: "mon-sb" },
				headerLeft: () => (
					<></>
				),
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

		<TouchableOpacity style={defaultStyles.btn} disabled={loading} onPress={signUpWithEmail}>
			<Text style={defaultStyles.btnText}>Sign Up</Text>
		</TouchableOpacity>
		<Link href="/(auth)/login" asChild>
			<TouchableOpacity style={{ marginTop: 10 }}>
				<Text style={styles.textBtn}>Already have an account? Login</Text>
			</TouchableOpacity>
		</Link>
	</View>
);
};

export default register;

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
