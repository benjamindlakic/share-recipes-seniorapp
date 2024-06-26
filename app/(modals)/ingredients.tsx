import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRecipe } from "@/api/recipes";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider";

const Ingredients = () => {
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
  const ingredients =
    typeof recipe.ingredients === "string"
      ? recipe.ingredients
          .split(",")
          .map((ingredient: string) => ingredient.trim())
      : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>
      <View style={styles.ingredientsContainer}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient: string, index: number) => (
            <View key={index} style={styles.ingredientItem}>
              <Ionicons
                name="caret-forward-circle"
                size={16}
                color={Colors.primary}
              />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>No ingredients found.</Text>
        )}
      </View>
    </View>
  );
};

export default Ingredients;

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
    borderRadius: 20,
    padding: 10,
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
