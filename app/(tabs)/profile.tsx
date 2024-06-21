import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView
} from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import ProfileHeader from "@/components/ProfileHeader";
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useUserRecipes } from "@/api/recipes";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const profile = () => {
  const { profile } = useAuth();
  const { data: recipes, error, isLoading } = useUserRecipes();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch user recipes.</Text>;
  }

  const renderRecipe: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.recipes}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{item.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="time-outline" size={20} color={Colors.dark} />
            <Text style={styles.infoText}>{item.cookingTime} min</Text>
            <Text style={styles.divider}></Text>
            <MaterialCommunityIcons
              name="pot-steam-outline"
              size={20}
              color="black"
            />
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
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <ProfileHeader />,
        }}
      />

      <Image
        source={{
          uri: `https://avatar.iran.liara.run/public/boy?username=${profile.full_name}`,
        }}
        style={styles.profileImage}
      />
      <Text style={{ textAlign: "center", fontFamily: "mon-sb", fontSize: 24 }}>
        Hello, {profile?.full_name}!
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statText}>{profile?.recipeCount}</Text>
          <Text style={styles.statLabel}>Recipes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.divider}></Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>{profile.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.divider}></Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>{profile.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      <Text style={styles.bioText}>
        {profile.bio || "Add a bio to let others know more about you!"}
      </Text>

      <View style={styles.buttonsContainer}>
        <Link href={"/(modals)/editProfile"} asChild>
          <TouchableOpacity style={styles.btnOutline}>
            <Text style={styles.btnOutlineText}>Edit Profile</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={styles.btnOutlineText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontFamily: "mon", fontSize: 22, marginTop: 10 }}>Created recipes</Text>
        <View style={styles.underline} />
      </View>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: Colors.primary,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  bioText: {
    marginTop: 15,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.grey,
    fontFamily: "mon",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 10,
  },
  stat: {
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  statLabel: {
    fontSize: 14,
    color: Colors.grey,
    fontFamily: "mon",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  btnOutline: {
    backgroundColor: "#D3D3D3",
    borderRadius: 32,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon",
  },
  textBtn: {
    color: Colors.grey,
    fontFamily: "mon",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  underline: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 1,
    width: "20%",
    backgroundColor: Colors.primary,
  },
  recipes: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
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
});
