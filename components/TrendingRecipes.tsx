import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Recipe {
  id: string;
  image: string;
  likes: number;
  title: string;
  cookingTime: number;
  difficulty: string;
}

interface Props {
  recipes?: Recipe[];
}

const Recipes = ({ recipes = [] }: Props) => {
  const [loading, setLoading] = useState(false);
  const recipeRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [recipes]);

  const renderRow = ({ item }: { item: any}) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={[styles.recipes, { marginHorizontal: -30, marginLeft: 0 }]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 40,
              top: 25,
              alignItems: "center",
            }}
          >
            <Ionicons name="heart-outline" size={26} color={"#fff"}></Ionicons>
            <View style={styles.likes}>
              <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                {item.likes}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={{fontFamily: 'mon-sb', fontSize: 14, textAlign: 'center', verticalAlign:'top', textAlignVertical:'top', bottom: 10}}>{item.title}</Text>

            <View style={{ justifyContent: "space-evenly", flexDirection: "row", padding: 0, bottom: 3, alignItems:'center'}}>
            <Ionicons name="time-outline" size={20} color={Colors.dark} />
              <Text style={styles.infoText}>{item.cookingTime} min</Text>
              <Text style={styles.divider}></Text>
              <MaterialCommunityIcons
                name="pot-steam-outline"
                size={20}
                color="black"
              />
              <Text style={styles.infoText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderRow}
        ref={recipeRef}
        data={loading ? [] : recipes}
        horizontal={true}
      />
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipes: {
    height: 250,
    width: 250,
    padding: 16,
  },
  divider: {
    width: 1,
    height: 15,
    backgroundColor: Colors.primary,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  likes: {
    backgroundColor: "#fff",
    width: 40,
    textAlign: "center",
    borderRadius: 12,
    marginTop: 3,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "absolute",
    paddingTop: 15,
    bottom: 5,
    left: 16,
    padding: 5,
    width: 200,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  infoText: {
    marginLeft: 5,
    fontFamily: "mon-sb",
    fontSize: 12,
    color: Colors.dark,
  },
});
