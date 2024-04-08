import { View, StyleSheet, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const PwReset = () => {
    const router = useRouter();
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const { signIn, setActive } = useSignIn();

	// Request a passowrd reset code by email
	const onRequestReset = async () => {
		try {
			await signIn!.create({
				strategy: 'reset_password_email_code',
				identifier: emailAddress
			});
			setSuccessfulCreation(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	// Reset the password with the code and the new password
	const onReset = async () => {
		try {
			const result = await signIn!.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password
			});
			console.log(result);

			// Set the user session active, which will log in the user automatically
			await setActive!({ session: result.createdSessionId });
            router.push('/(tabs)/explore');

		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

			{!successfulCreation && (
				<>
					<TextInput
						autoCapitalize="none"
						placeholder="example@example.com"
						value={emailAddress}
						onChangeText={setEmailAddress}
                        style={[defaultStyles.inputField, {marginBottom: 20}]}
                        />

                        <TouchableOpacity style={defaultStyles.btn} onPress={onRequestReset}>
                            <Text style={defaultStyles.btnText}>Send Reset Email</Text>
                        </TouchableOpacity>

				</>
			)}

			{successfulCreation && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
                            style={[defaultStyles.inputField, {marginBottom: 20}]}
							onChangeText={setCode}
						/>
						<TextInput
							placeholder="New password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
                            style={[defaultStyles.inputField, {marginBottom: 20}]}
                            />
					</View>
                    <TouchableOpacity style={defaultStyles.btn} onPress={onReset}>
                            <Text style={defaultStyles.btnText}>Set New Password</Text>
                        </TouchableOpacity>
				</>
			)}
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
export default PwReset;