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
import React, { useRef } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRecipeList } from "@/api/recipes";

const Recipes = () => {
  const { data: recipes, error, isLoading } = useRecipeList();
  
  const recipeRef = useRef<FlatList>(null);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch recipes.</Text>;
  }

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.recipes}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="heart-outline" size={26} color={"#fff"} />
            <View style={styles.likes}>
              <Text style={styles.likeText}>{item.likes}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chefButton}>
            <View style={styles.chef}>
              <Text style={styles.chefText}>{item.full_name}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{item.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="time-outline" size={20} color={Colors.dark} />
            <Text style={styles.infoText}>{item.cookingTime} min</Text>
            <Text style={styles.divider}></Text>
            <MaterialCommunityIcons name="pot-steam-outline" size={20} color="black" />
            <Text style={styles.infoText}>{item.difficulty}</Text>
            <Text style={styles.divider}></Text>
            <Ionicons name="flame-outline" size={20} color={Colors.dark} />
            <Text style={styles.infoText}>{item.calories}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList data={recipes} renderItem={renderRow} ref={recipeRef} />
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recipes: {
    padding: 16,
  },
  divider: {
    width: 1,
    height: 15,
    backgroundColor: Colors.primary,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "absolute",
    justifyContent: "space-evenly",
    paddingTop: 15,
    bottom: 5,
    left: 16,
    padding: 5,
    height: 50,
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
    fontSize: 14,
    color: Colors.dark,
  },
  recipeNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 80,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    left: 30,
    width: "90%",
  },
  recipeName: {
    fontFamily: "mon-sb",
    fontSize: 20,
    color: "#fff",
    padding: 10,
  },
  likes: {
    backgroundColor: "#fff",
    width: 40,
    textAlign: "center",
    borderRadius: 12,
    marginTop: 5,
  },
  likeText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    textAlignVertical: "center",
    textAlign: "center",
  },
  chefButton: {
    position: "absolute",
    left: 30,
    top: 30,
    alignItems: "center",
  },
  likeButton: {
    position: "absolute",
    right: 30,
    top: 30,
    alignItems: "center",
  },
  chef: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: 14,
  },
  chefText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    textAlignVertical: "center",
    padding: 7,
    width: "auto",
  },
});
