import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Stack, useNavigation } from "expo-router";
import AddHeader from "@/components/AddHeader";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import * as ImagePicker from "expo-image-picker";
import Animated from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";

const Page = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to use the camera");
      return;
    }

    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
      });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <AddHeader />,
          headerLeft: () => <Ionicons></Ionicons>,
        }}
      />
      <Animated.ScrollView style={{marginTop: 20,}}>
          <Text style={styles.headerStyle}>Title</Text>
          <View style={{ paddingHorizontal: 10 }}>
            <TextInput
              placeholder="Give your recipe a name"
              style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            />
          </View>
          <View style={{ padding: 10, alignItems: "center", marginTop: 5 }}>
            {imageUri && (
              <>
                <Image
                  source={{ uri: imageUri }}
                  style={[styles.selectedImage]}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={pickImage}
                >
                  <Ionicons name="camera" size={24} color={Colors.primary} />
                  <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                    Change photo
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {!imageUri && (
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={{
                    backgroundColor: Colors.grey,
                    width: 340,
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                >
                  <Ionicons name="camera" size={24} color={Colors.primary} />
                  <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                    Add photo
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.headerStyle}>Description</Text>
          <View style={{ paddingHorizontal: 10 }}>
            <TextInput
              placeholder="Introduce your recipe, add notes, tips, etc."
              style={[
                defaultStyles.inputField,
                { height: 100, padding: 10, paddingVertical: 20 },
              ]}
              multiline={true}
            />
          </View>
          <Text style={styles.headerStyle}>Ingredients</Text>
          <View style={{ paddingHorizontal: 10 }}>
            <TextInput
              placeholder="Add one ingredient, then press enter"
              style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            />
          </View>
          <Text style={styles.headerStyle}>Instructions</Text>
          <View style={{ paddingHorizontal: 10 }}>
            <TextInput
              placeholder="Add one step, then press enter"
              style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            />
          </View>
          <Text style={styles.headerStyle}>Preparation Time</Text>
          <View style={{ paddingHorizontal: 10 }}>
            <TextInput
              placeholder="# of minutes for this recipe"
              style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
              keyboardType="numeric"
              onChangeText={(text) => {
                const regex = /^[0-9]*$/;
                if (regex.test(text)) {
                  // UPDATE STATE
                } else {
                  // NOTHING, DONT LET TYPE
                }
              }}
            />
          </View>
          <Text style={styles.headerStyle}>Difficulty</Text>
          <View style={{ paddingHorizontal: 10 }}>
            <Picker
              style={{flex:1}}
              mode="dropdown"
              dropdownIconColor={Colors.primary}
              selectedValue={selectedDifficulty}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDifficulty(itemValue)
              }
            >
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
          </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#fff",
  },
  formContainer: {
    marginTop: 30,
    paddingBottom: 10,
    backgroundColor: "#fff",
    height: "auto",
    margin: 16,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  headerStyle: {
    fontFamily: "mon-sb",
    fontSize: 20,
    padding: 10,
  },
  imagePickerButton: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: 10,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontFamily: "mon-sb",
    textAlign: "center",
  },
  selectedImage: {
    paddingHorizontal: 10,
    width: 340,
    height: 200,
    resizeMode: "stretch",
    borderRadius: 8,
  },
});
