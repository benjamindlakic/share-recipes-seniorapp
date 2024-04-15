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
import * as ImagePicker from 'expo-image-picker';
import Animated from "react-native-reanimated";

const Page = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  function setRecipeTitle(text: string): void {
    throw new Error("Function not implemented.");
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
        alert("Sorry, we need camera permissions to use the camera");
        return;
    }

    let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
    });
    if (!result.canceled) {
        
        setImageUri(result.assets[0].uri);
        console.log("Selected image URI:", result.assets[0].uri);
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff'}}>
      <Stack.Screen
        options={{
          header: () => <AddHeader />,
          headerLeft: () => <Ionicons></Ionicons>,
        }}
      />
      <Animated.ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.headerStyle}>Title</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            placeholder="Give your recipe a name"
            onChangeText={setRecipeTitle}
            style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
          />
        </View>
        <View style={{padding: 10, alignItems: 'center', marginTop: 5}}>
        {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.selectedImage} />
            )}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>Add Image</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerStyle}>Description</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            placeholder="Give your recipe a name"
            onChangeText={setRecipeTitle}
            style={[defaultStyles.inputField, { height: 100, padding: 10 }]}
          />
        </View>
        <Text style={styles.headerStyle}>Ingredients</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            placeholder="Give your recipe a name"
            onChangeText={setRecipeTitle}
            style={[defaultStyles.inputField, { height: 100, padding: 10 }]}
          />
        </View>
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
