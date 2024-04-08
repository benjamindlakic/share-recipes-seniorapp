import { Button, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { Stack, router } from 'expo-router';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			// Create the user on Clerk
			await signUp.create({
				emailAddress,
				password
			});

			// Send verification Email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
            router.push('/(tabs)/explore');
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !pendingVerification}}  />

			{!pendingVerification && (
				<>
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
                    
                    <TouchableOpacity style={defaultStyles.btn} onPress={onSignUpPress}>
                        <Text style={defaultStyles.btnText}>Sign Up</Text>
                    </TouchableOpacity>
                </>
			)}

			{pendingVerification && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							style={[defaultStyles.inputField, {marginBottom: 20}]}
							onChangeText={setCode}
						/>
					</View>
					<TouchableOpacity style={defaultStyles.btn} onPress={onPressVerify}>
                        <Text style={defaultStyles.btnText}>Verify Email</Text>
                    </TouchableOpacity>
				</>
			)}
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