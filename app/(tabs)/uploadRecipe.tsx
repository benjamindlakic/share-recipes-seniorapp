import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import AddHeader from "@/components/AddHeader";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useInsertRecipe } from "@/api/recipes";
import { useAuth } from "@/providers/AuthProvider";

const UploadRecipe = () => {
  const { session, loading } = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [preparationTime, setPreparationTime] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState();
  const [proteins, setProteins] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [calories, setCalories] = useState("");
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIngredients([""]);
    setInstructions([""]);
    setPreparationTime("");
    setImageUri(null);
    setProteins("");
    setCarbs("");
    setFats("");
    setCalories("");
  };

  const validateForm = () => {
    setErrors("");
    if (!title) {
      setErrors("Please enter a title");
      return false;
    }
    if (!description) {
      setErrors("Please enter a description");
      return false;
    }
    if (!ingredients || ingredients.some((ingredient) => !ingredient)) {
      setErrors("Please enter all ingredients");
      return false;
    }
    if (!instructions || instructions.some((instruction) => !instruction)) {
      setErrors("Please enter all instructions");
      return false;
    }
    if (!instructions) {
      setErrors("Please enter instructions");
      return false;
    }
    if (!preparationTime) {
      setErrors("Please enter preparation time");
      return false;
    }
    if (isNaN(Number(preparationTime))) {
      setErrors("Preparation time must be a number");
      return false;
    }
    if (!selectedDifficulty) {
      setErrors("Please select a difficulty");
      return false;
    }
    if (!imageUri) {
      setErrors("Please select an image");
      return false;
    }
    if (!proteins || isNaN(Number(proteins))) {
      setErrors('Please enter valid proteins (g)');
      return false;
    }
    if (!carbs || isNaN(Number(carbs))) {
      setErrors('Please enter valid carbs (g)');
      return false;
    }
    if (!fats || isNaN(Number(fats))) {
      setErrors('Please enter valid fats (g)');
      return false;
    }
    if (!calories || isNaN(Number(calories))) {
      setErrors('Please enter valid calories (g)');
      return false;
    }
    return true;
  };

  const handleSavePress = () => {
    if (!validateForm()) {
      return;
    }
    if (!session || !session.user || !session.user.id) {
      console.error("User not authenticated");
      return;
    }

    const userID = session.user.id;

    insertRecipe(
      {
        title,
        userID,
        description,
        image: imageUri,
        ingredients: ingredients.join(", "),
        instructions: instructions.join(", "),
        difficulty: selectedDifficulty,
        cookingTime: Number(preparationTime),
        proteins: Number(proteins),
        carbs: Number(carbs),
        fats: Number(fats),
        calories: Number(calories),
      },
      {
        onSuccess: () => {
          resetForm();
          router.back();
        },
      }
    );
  };

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

  const { mutate: insertRecipe } = useInsertRecipe();

  const handleIngredientChange = (text: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    if (ingredients[ingredients.length - 1]) {
      setIngredients([...ingredients, ""]);
    }
  };

  const handleInstructionChange = (text: string, index: number) => {
    const newInstructions = [...instructions];
    newInstructions[index] = text;
    setInstructions(newInstructions);
  };

  const handleAddInstruction = () => {
    if (instructions[instructions.length - 1]) {
      setInstructions([...instructions, ""]);
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
      <ScrollView style={{ marginTop: 20 }}>
        <Text style={styles.headerStyle}>Title</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            value={title}
            onChangeText={setTitle}
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
            value={description}
            onChangeText={setDescription}
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
          {ingredients.map((ingredient, index) => (
            <TextInput
              key={index}
              value={ingredient}
              onChangeText={(text) => handleIngredientChange(text, index)}
              placeholder="Add one ingredient, then press enter"
              style={[
                defaultStyles.inputField,
                { height: 40, padding: 10, marginBottom: 5 },
              ]}
              onSubmitEditing={handleAddIngredient}
            />
          ))}
        </View>
        <Text style={styles.headerStyle}>Instructions</Text>
        <View style={{ paddingHorizontal: 10 }}>
          {instructions.map((instruction, index) => (
            <TextInput
              key={index}
              value={instruction}
              onChangeText={(text) => handleInstructionChange(text, index)}
              placeholder="Add one step, then press enter"
              style={[
                defaultStyles.inputField,
                { height: 40, padding: 10, marginBottom: 5 },
              ]}
              onSubmitEditing={handleAddInstruction}
            />
          ))}
        </View>
        <Text style={styles.headerStyle}>Preparation Time</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            value={preparationTime}
            onChangeText={setPreparationTime}
            placeholder="# of minutes for this recipe"
            style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.headerStyle}>Calories (kcal)</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            value={calories}
            onChangeText={setCalories}
            placeholder="Calories in kcal"
            style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.headerStyle}>Proteins (g)</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            value={proteins}
            onChangeText={setProteins}
            placeholder="Proteins in grams"
            style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.headerStyle}>Carbs (g)</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            value={carbs}
            onChangeText={setCarbs}
            placeholder="Carbs in grams"
            style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.headerStyle}>Fats (g)</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <TextInput
            value={fats}
            onChangeText={setFats}
            placeholder="Fats in grams"
            style={[defaultStyles.inputField, { height: 40, padding: 10 }]}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.headerStyle}>Difficulty</Text>
        <View style={{ paddingHorizontal: 10 }}>
          <Picker
            style={{ flex: 1 }}
            mode="dropdown"
            dropdownIconColor={Colors.primary}
            selectedValue={selectedDifficulty}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDifficulty(itemValue)
            }
          >
            <Picker.Item label="Easy" value="Easy" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Hard" value="Hard" />
          </Picker>
        </View>
        <Text
          style={{
            color: "red",
            textAlign: "center",
            fontFamily: "mon-r",
            margin: 5,
          }}
        >
          {errors}
        </Text>
        <TouchableOpacity style={styles.btnSave} onPress={handleSavePress}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UploadRecipe;

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
    alignSelf: "center",
  },
  btnSave: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    height: 50,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
  },
  btnText: {
    color: "#fff",
    fontFamily: "mon-b",
    fontSize: 16,
  },
});
