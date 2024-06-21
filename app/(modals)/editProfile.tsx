import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

const EditProfile = () => {
  const { session, profile, setSession } = useAuth();
  const [full_name, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
    if (profile) {
      setFullName(profile.firstName);
      setBio(profile.bio);
    }
  }, [profile]);

  const onSaveUser = async () => {
    try {
      const { error } = await supabase.from("profiles").update({
        full_name,
        bio,
      }).eq("id", session?.user.id);

      if (error) throw error;
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const onChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder="Full Name"
          value={full_name}
          onChangeText={setFullName}
          style={[defaultStyles.inputField, { marginTop: 20, height: 40 }]}
        />
        <TextInput
          placeholder="Add short bio (100 characters max)"
          value={bio}
          onChangeText={setBio}
          maxLength={100}
          multiline={true}
          style={[
            defaultStyles.inputField,
            { marginTop: 20, marginBottom: 20, height: 90, textAlignVertical: "top" },
          ]}
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
          value={oldPassword || ""}
          onChangeText={setOldPassword}
          secureTextEntry
          style={[defaultStyles.inputField, { marginTop: 10, height: 40 }]}
        />

        <TextInput
          placeholder="New password"
          value={newPassword || ""}
          onChangeText={setNewPassword}
          secureTextEntry
          style={[defaultStyles.inputField, { marginTop: 20, height: 40 }]}
        />

        <TextInput
          placeholder="Repeat your new password"
          value={confirmPassword || ""}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={[defaultStyles.inputField, { marginTop: 20, height: 40, marginBottom: 20 }]}
        />

        <TouchableOpacity style={defaultStyles.btn} onPress={onChangePassword}>
          <Text style={defaultStyles.btnText}>Change password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
});
