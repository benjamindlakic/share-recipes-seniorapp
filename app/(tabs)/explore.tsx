import ExploreHeader from "@/components/ExploreHeader";
import { Stack } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Recipes from "@/components/TrendingRecipes";
import Animated from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {
  useFollowUser,
  useLowestCalorieRecipes,
  useRecipeList,
  useTopLikedRecipes,
  useTopProfiles,
} from "@/api/recipes";
import { useAuth } from "@/providers/AuthProvider";

const Page = () => {
  const { data: topLikedRecipes } = useTopLikedRecipes();
  const { data: lowestCalorieRecipes } = useLowestCalorieRecipes();
  const { session } = useAuth();
  const user_id = session?.user?.id ?? "";
  const { data, refetch: refetchTopProfiles } = useTopProfiles(user_id);
  const { profiles, follows } = data || {};
  const followUser = useFollowUser();

  const handleFollow = (
    following_id: any,
    followed: boolean | undefined = false
  ) => {
    followUser.mutate(
      { follower_id: user_id, following_id, followed },
      {
        onSuccess: () => {
          refetchTopProfiles();
        },
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Animated.ScrollView>
        <View style={{ flex: 1, marginTop: 30 }}>
          <View style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 18,
                  backgroundColor: "transparent",
                  paddingHorizontal: 15,
                }}
              >
                Take a look at trending recipes
              </Text>
              <Ionicons
                name="flame"
                size={22}
                color={Colors.primary}
                style={{ position: "absolute", right: 15 }}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Recipes recipes={topLikedRecipes} />
            </ScrollView>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 18,
                  backgroundColor: "transparent",
                  paddingHorizontal: 15,
                }}
              >
                Follow some of our best chefs
              </Text>
              <MaterialCommunityIcons
                name="chef-hat"
                size={22}
                color={Colors.primary}
                style={{ position: "absolute", right: 15 }}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {profiles &&
                profiles.map((profile) => {
                  const followed = follows?.some(
                    (follow) => follow.following_id === profile.id
                  );
                  return (
                    <View
                      key={profile.id}
                      style={{
                        padding: 16,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: `https://avatar.iran.liara.run/public/boy?username=${profile.full_name}`,
                        }}
                        style={styles.profileImage}
                      />
                      <Text
                        style={{
                          fontFamily: "mon-sb",
                          fontSize: 14,
                          textAlign: "center",
                          marginTop: 5,
                        }}
                      >
                        {profile.full_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "mon",
                          fontSize: 12,
                          textAlign: "center",
                          marginTop: 5,
                        }}
                      >
                        {profile.followers} Followers
                      </Text>
                      {user_id !== profile.id && (
                        <TouchableOpacity
                          style={styles.followButton}
                          onPress={() => handleFollow(profile.id, followed)}
                        >
                          <Ionicons
                            name={followed ? "checkmark" : "add"}
                            size={16}
                            style={{ color: Colors.primary }}
                          />
                          <Text
                            style={{
                              fontFamily: "mon",
                              fontSize: 16,
                              color: Colors.primary,
                            }}
                          >
                            {followed ? "Following" : "Follow"}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
            </ScrollView>

            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  fontSize: 18,
                  backgroundColor: "transparent",
                  paddingHorizontal: 15,
                }}
              >
                Low Calorie Recipes
              </Text>
              <Ionicons
                name="nutrition"
                size={22}
                color={Colors.primary}
                style={{ position: "absolute", right: 15 }}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Recipes recipes={lowestCalorieRecipes} />
            </ScrollView>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginTop: 10,
    padding: 16,
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
  },
});
