import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSearchRecipes } from "@/api/recipes"; 
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Search = () => {
  const { query, minCalories, maxCalories, minCookingTime, maxCookingTime, difficulty } = useLocalSearchParams();


  const parsedQuery = query ? query.toString() : "";
  const parsedMinCalories = minCalories !== undefined ? Number(minCalories) : 0;
  const parsedMaxCalories = maxCalories !== undefined ? Number(maxCalories) : 2000;
  const parsedMinCookingTime = minCookingTime !== undefined ? Number(minCookingTime) : 0;
  const parsedMaxCookingTime = maxCookingTime !== undefined ? Number(maxCookingTime) : 180;
  const parsedDifficulty = difficulty ? difficulty.toString() : "";

  const { data: recipes, error, isLoading } = useSearchRecipes(
    parsedQuery,
    parsedMinCalories,
    parsedMaxCalories,
    parsedMinCookingTime,
    parsedMaxCookingTime,
    parsedDifficulty
  );
  const recipeRef = useRef<FlatList>(null);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to fetch recipes.</Text>
      </View>
    );
  }

  const renderRow: ListRenderItem<any> = ({ item }) => {
    if (!item.id) return <View style={styles.recipeContainer} />; // Placeholder item
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity style={styles.recipeContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity style={styles.chefButton}>
            <View style={styles.chef}>
              <Text style={styles.chefText}>{item.full_name}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{item.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="time-outline" size={18} color={Colors.dark} />
            <Text style={styles.infoText}>{item.cookingTime} min</Text>
            <Text style={styles.divider}></Text>
            <MaterialCommunityIcons name="pot-steam-outline" size={18} color="black" />
            <Text style={styles.infoText}>{item.difficulty}</Text>
            <Text style={styles.divider}></Text>
            <Ionicons name="flame-outline" size={18} color={Colors.dark} />
            <Text style={styles.infoText}>{item.calories}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  // Add a placeholder item if the number of items is odd
  if (recipes && recipes.length % 2 !== 0) {
    recipes.push({ id: null });
  }

  return (
    <View style={defaultStyles.container}>
      <Text style={styles.header}>Results for "{query}"</Text>
      <FlatList
        data={recipes}
        renderItem={renderRow}
        ref={recipeRef}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
  },
  listContent: {
    paddingHorizontal: 8,
  },
  rowWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8, 
    marginBottom: 16,
  },
  row: {
    flex: 1,
  },
  recipeContainer: {
    flex: 1,
    padding: 5,
  },
  divider: {
    width: 1,
    height: 15,
    backgroundColor: Colors.primary,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "space-evenly",
    alignContent: 'center',
    paddingTop: 10,
    bottom: 10,
    height: 35,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  infoText: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 12,
    color: Colors.dark,
  },
  recipeNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 60,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    left: 8,
    width: "90%",
  },
  recipeName: {
    fontFamily: "mon-sb",
    fontSize: 16,
    color: "#fff",
    padding: 5,
  },
  chefButton: {
    position: "absolute",
    left: 8,
    top: 8,
    alignItems: "center",
  },
  chef: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: 14,
  },
  chefText: {
    fontFamily: "mon-sb",
    fontSize: 12,
    textAlignVertical: "center",
    padding: 5,
    width: "auto",
  },
  header: {
    fontSize: 18,
    color: Colors.grey,
    fontFamily: "mon-sb",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 10,
  },
});
