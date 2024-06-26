import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRecipe } from "@/api/recipes";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";
import { ScrollView } from "react-native-virtualized-view";

const Instructions = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString
    ? parseFloat(Array.isArray(idString) ? idString[0] : idString)
    : NaN;

  const { session } = useAuth();
  const user_id = session?.user?.id ?? "";
  const { data: recipe, error, isLoading } = useRecipe(id, user_id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Failed to fetch recipe. Please try again later.
        </Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  // Convert ingredients to array if it's a string
  const instructions =
    typeof recipe.instructions === "string"
      ? recipe.instructions
          .split(",")
          .map((instruction: string) => instruction.trim())
      : [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <View style={styles.ingredientsContainer}>
        {instructions.length > 0 ? (
          instructions.map((instruction: string, index: number) => (
            <View key={index} style={styles.ingredientItem}>
              <Ionicons
                name="caret-forward-circle"
                size={16}
                color={Colors.primary}
              />
              <Text style={styles.ingredientText}>{instruction}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>No instrcutions found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontFamily: "mon-b",
    fontSize: 22,
    paddingBottom: 15,
  },
  ingredientsContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginBottom: 50,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  ingredientText: {
    fontFamily: "mon",
    fontSize: 16,
    paddingLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: "mon",
    fontSize: 16,
    color: "red",
  },
});
