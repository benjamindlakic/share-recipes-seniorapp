import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from "react-native";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedStyle,
  useScrollViewOffset,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { useFollowUser, useLikeRecipe, useRecipe } from "@/api/recipes";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const { id: idString } = useLocalSearchParams();
  const { session } = useAuth();
  const user_id = session?.user?.id ?? "";

  const id = idString
    ? parseFloat(Array.isArray(idString) ? idString[0] : idString)
    : NaN;

  const { data: recipe, error, isLoading } = useRecipe(id, user_id);

  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  const scrollOffset = useSharedValue(0);

  const likeRecipe = useLikeRecipe();
  const [followed, setFollowed] = useState(false);
  const followUser = useFollowUser();

  useEffect(() => {
    if (session && session.user && recipe) {
      checkIfFollowing(recipe.userID)
        .then((isFollowing) => {
          setFollowed(isFollowing);
        })
        .catch((error) => {
          console.error("Error checking follow status:", error);
        });
    }
  }, [session, recipe]);

  const checkIfFollowing = async (userID: any) => {
    try {
      const { data: follows, error } = await supabase
        .from("follows")
        .select("*")
        .eq("follower_id", user_id)
        .eq("following_id", userID);

      if (error) {
        throw error;
      }

      const isFollowing = follows.length > 0;

      return isFollowing;
    } catch (error) {
      console.error("Error checking follow status:", error);
      return false;
    }
  };

  const handleFollow = () => {
    if (session && session.user && recipe) {
      followUser.mutate(
        {
          follower_id: user_id,
          following_id: recipe.userID,
          followed: followed,
        },
        {
          onSuccess: () => {
            setFollowed(!followed);
          },
          onError: (error) => {
            console.error("Error during follow/unfollow action:", error);
          },
        }
      );
    } else {
      console.log("Session or recipe is undefined");
    }
  };

  const handleLike = () => {
    if (session && session.user && recipe) {
      likeRecipe.mutate({
        user_id,
        recipe_id: id,
        liked: recipe.likedByCurrentUser,
      });
    } else {
      console.log("Session or recipe is undefined");
    }
  };

  const shareRecipe = async () => {
    try {
      await Share.share({
        title: recipe.title,
        // url: recipe.recipe_url,
        message: `Check out this recipe: ${recipe.title}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View style={[styles.header, headerAnimatedStyle]} />
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.roundButton} onPress={shareRecipe}>
          <Ionicons name="share-social-outline" size={22} color={"#fff"} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#fff"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !recipe) {
    return <Text>Failed to fetch product</Text>;
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: recipe.image }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Text style={styles.recipeName}>{recipe.title}</Text>
          <View
            style={{
              position: "absolute",
              marginTop: 20,
              right: 5,
              height: 100,
              width: 50,
            }}
          >
            <TouchableOpacity onPress={handleLike}>
              <Ionicons
                name={recipe.likedByCurrentUser ? "heart" : "heart-outline"}
                size={36}
                color={recipe.likedByCurrentUser ? "red" : "#000"}
                style={{ marginTop: 5, textAlign: "center" }}
              />
              <Text
                style={{ fontFamily: "mon", fontSize: 18, textAlign: "center" }}
              >
                {recipe.likes}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ flex: 1, width: "85%" }}
            onPress={toggleExpand}
          >
            {expanded ? (
              <Text style={styles.recipeDescription}>
                {recipe.description}
                <Text
                  style={{
                    fontFamily: "mon",
                    fontSize: 14,
                    color: Colors.primary,
                    paddingLeft: 15,
                    marginBottom: 5,
                  }}
                >
                  {expanded ? "Less" : "More"}
                </Text>
              </Text>
            ) : (
              <Text style={styles.recipeDescription}>
                {recipe.description.slice(0, 100)}...
                <Text
                  style={{
                    fontFamily: "mon",
                    fontSize: 14,
                    color: Colors.primary,
                    paddingLeft: 15,
                    marginBottom: 5,
                  }}
                >
                  {expanded ? "Less" : "More"}
                </Text>
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.chef}>
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 16,
                textAlignVertical: "center",
                padding: 10,
                paddingTop: 20,
                width: "auto",
              }}
            >
              {recipe.full_name}
            </Text>
            {user_id !== recipe.userID && ( // Only show if current user is not the recipe creator
              <TouchableOpacity
                style={styles.btnOutline}
                onPress={handleFollow}
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
          <View style={styles.infoContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={Colors.dark}
            ></Ionicons>
            <Text style={styles.infoText}>{recipe.cookingTime} min</Text>
            <Text style={styles.vDivider}></Text>
            <MaterialCommunityIcons
              name="pot-steam-outline"
              size={20}
              color="black"
            />
            <Text style={styles.infoText}>{recipe.difficulty}</Text>
            <Text style={styles.vDivider}></Text>
            <Ionicons
              name="flame-outline"
              size={20}
              color={Colors.dark}
            ></Ionicons>
            <Text style={styles.infoText}>{recipe.calories}</Text>
          </View>
          <View style={styles.stats}>
            <View style={styles.statsIndiv}>
              <Text style={styles.statsText}>{recipe.proteins}</Text>
              <Text
                style={{ textAlign: "center", fontFamily: "mon", fontSize: 14 }}
              >
                Proteins
              </Text>
            </View>
            <View style={styles.statsIndiv}>
              <Text style={styles.statsText}>{recipe.carbos}</Text>
              <Text
                style={{ textAlign: "center", fontFamily: "mon", fontSize: 14 }}
              >
                Carbs
              </Text>
            </View>
            <View style={styles.statsIndiv}>
              <Text style={styles.statsText}>{recipe.fats}</Text>
              <Text
                style={{ textAlign: "center", fontFamily: "mon", fontSize: 14 }}
              >
                Fats
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.ScrollView
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Link href={`/instructions?id=${id}`} asChild>
            <TouchableOpacity style={styles.btnGo}>
              <Text style={defaultStyles.btnText}>Instructions</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ color: "#fff" }}
              ></Ionicons>
            </TouchableOpacity>
          </Link>
          <Link href={`/ingredients?id=${id}`} asChild>
            <TouchableOpacity style={styles.btnGo}>
              <Text style={defaultStyles.btnText}>Ingredients</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ color: "#fff" }}
              ></Ionicons>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: IMG_HEIGHT,
    width,
  },
  image: {
    height: IMG_HEIGHT,
    width,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  recipeName: {
    fontFamily: "mon-b",
    fontSize: 22,
    padding: 15,
    width: "85%",
    height: "auto",
  },
  recipeDescription: {
    fontFamily: "mon",
    fontSize: 16,
    padding: 15,
    paddingTop: 0,
    height: "auto",
    paddingBottom: 0,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginTop: 10,
  },
  chef: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    paddingTop: 0,
    marginTop: 10,
  },
  btnOutline: {
    borderRadius: 32,
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "relative",
    verticalAlign: "middle",
    justifyContent: "space-evenly",
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 10,
    marginHorizontal: 10,
  },
  infoText: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.dark,
  },
  vDivider: {
    width: 1,
    height: 15,
    backgroundColor: Colors.primary,
  },
  stats: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  statsIndiv: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 60,
    borderColor: Colors.primary,
  },
  statsText: {
    paddingTop: 25,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "mon-sb",
    fontSize: 18,
  },
  btnGo: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    height: 40,
    width: 150,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
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
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomColor: Colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
