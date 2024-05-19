import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import recipeData from "@/assets/data/recipes.json";
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = (recipeData as any[]).find((item) => item.id === id);
  const [expanded, setExpanded] = React.useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const navigation = useNavigation();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const shareRecipe = async () => {
    try {
      await Share.share({
        title: recipe.name,
        url: recipe.recipe_url,
        message: `Check out this recipe: ${recipe.name}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View style={[styles.header, headerAnimatedStyle]}/>
      ),
      headerRight: () => (
            <TouchableOpacity style={styles.roundButton} onPress={shareRecipe}>
              <Ionicons name="share-social-outline" size={22} color={'#fff'} />
            </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#fff'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT/1.5], [0, 1])
    }
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          )
        }
      ],
    };
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} contentContainerStyle={{paddingBottom: 100}}
      scrollEventThrottle={16}>
        <Animated.Image source={{ uri: recipe.image }} style={[styles.image, imageAnimatedStyle]} />
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <View
            style={{
              position: "absolute",
              marginTop: 20,
              right: 5,
              height: 100,
              width: 50,
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="heart-outline"
                size={30}
                color={"#000"}
                style={{ marginTop: 5, textAlign: "center" }}
              ></Ionicons>
              <Text
                style={{ fontFamily: "mon", fontSize: 14, textAlign: "center" }}
              >
                {recipe.likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="chatbubble-outline"
                size={30}
                color={"#000"}
                style={{ marginTop: 25, textAlign: "center" }}
              ></Ionicons>
              <Text
                style={{ fontFamily: "mon", fontSize: 14, textAlign: "center" }}
              >
                140
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
          {/* <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} /> */}
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
              {recipe.chef}
            </Text>
            <TouchableOpacity style={styles.btnOutline}>
              <Ionicons
                name="add"
                size={16}
                style={{ color: Colors.primary }}
              ></Ionicons>
              <Text
                style={{
                  fontFamily: "mon",
                  fontSize: 16,
                  color: Colors.primary,
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={Colors.dark}
            ></Ionicons>
            <Text style={styles.infoText}>{recipe.time}</Text>
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
          <Link href={'/(modals)/instructions'} asChild>
            <TouchableOpacity style={styles.btnGo}>
              <Text style={defaultStyles.btnText}>Instructions</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ color: "#fff" }}
              ></Ionicons>
            </TouchableOpacity>
          </Link>
          <Link href={'/(modals)/ingredients'} asChild>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomColor: Colors.grey,
    borderWidth: StyleSheet.hairlineWidth,

  }
});
