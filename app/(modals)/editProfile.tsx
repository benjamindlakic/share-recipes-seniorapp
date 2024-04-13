import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker"; // for image selection

const editProfile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [bio, setBio] = useState(user?.bio);
  const [profileImage, setProfileImage] = useState(null);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // Request camera roll permission (optional for iOS)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to choose an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Update profileImage state with the selected image
      setProfileImage(result.uri);
    }
  };
  useEffect(() => {
  }, [user]); // Trigger on user object changes
  return (
    <View style={styles.container}>
      {profileImage ? (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          <Text style={styles.profileImageText}>Add Profile Picture</Text>
        </TouchableOpacity>
      )}
      <TextInput
        placeholder="First Name"
        value={firstName || ""}
        onChangeText={setFirstName}
        style={[defaultStyles.inputField, { marginTop: 20, height: 40 }]}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName || ""}
        onChangeText={setLastName}
        style={[defaultStyles.inputField, { marginTop: 20, height: 40 }]}
      />
      <TextInput
        placeholder="Add short bio (100 characters max)"
        value={bio || ""}
        onChangeText={setBio}
        maxLength={150}
        multiline={true}
        style={[defaultStyles.inputField, { marginTop: 20, marginBottom: 20, height: 90, textAlignVertical: 'top'}]}
      />
      <TouchableOpacity style={defaultStyles.btn} onPress={onSaveUser}>
        <Text style={defaultStyles.btnText}>Save changes</Text>
      </TouchableOpacity>

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

      <TextInput
        placeholder="Old password"
        value={lastName || ""}
        onChangeText={setLastName}
        style={[defaultStyles.inputField, { marginTop: 10, height: 40 }]}
      />

      <TextInput
        placeholder="New password"
        value={lastName || ""}
        onChangeText={setLastName}
        style={[defaultStyles.inputField, { marginTop: 20, height: 40 }]}
      />

      <TextInput
        placeholder="Repeat your new password"
        value={lastName || ""}
        onChangeText={setLastName}
        style={[defaultStyles.inputField, { marginTop: 20, height: 40, marginBottom: 20}]}
      />

      <TouchableOpacity style={defaultStyles.btn} onPress={onSaveUser}>
        <Text style={defaultStyles.btnText}>Change password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default editProfile;

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
  divider: {
    width: 1,
    height: 25,
    backgroundColor: Colors.primary,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  bioText: {
    marginTop: 15,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.grey,
    fontFamily: "mon",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 10,
  },
  stat: {
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  statLabel: {
    fontSize: 14,
    color: Colors.grey,
    fontFamily: "mon",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  btnOutline: {
    backgroundColor: "#D3D3D3",
    borderRadius: 32,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon",
  },
  textBtn: {
    color: Colors.grey,
    fontFamily: "mon",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
