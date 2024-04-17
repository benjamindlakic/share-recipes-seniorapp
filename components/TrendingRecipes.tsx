import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  recipes: any[];
}
const Recipes = ({ recipes: items }: Props) => {
  const [loading, setLoading] = useState(false);
  const recipeRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("dadada", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [items]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity >
        <View style={[styles.recipes,{marginHorizontal: -30, marginLeft: 0,}]}>
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
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 14,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              >
                {item.likes}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={{fontFamily: 'mon-sb', fontSize: 14, textAlign: 'center', verticalAlign:'top', textAlignVertical:'top', bottom: 10}}>{item.name}</Text>

            <View style={{ justifyContent: "space-evenly", flexDirection: "row", padding: 0, bottom: 3, alignItems:'center'}}>
              <Ionicons
                name="time-outline"
                size={20}
                color={Colors.dark}
              ></Ionicons>
              <Text style={styles.infoText}>{item.time}</Text>
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
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderRow}
        ref={recipeRef}
        data={loading ? [] : items}
        horizontal={true}
      />
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
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
    verticalAlign: "middle",
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
    height: 'auto',
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
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 12,
    color: Colors.dark,
  },
});
