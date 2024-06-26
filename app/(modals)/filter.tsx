import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Animated, { SlideInDown } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Stack, usePathname } from "expo-router";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Filter = () => {
  const [caloriesValue, setCaloriesValue] = useState([0, 2000]);
  const [cookingValue, setCookingValue] = useState([0, 180]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>();

  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const caloriesValuesChange = (values: number[]) => setCaloriesValue(values);
  const cookingValuesChange = (values: number[]) => setCookingValue(values);

  const handleShowResults = () => {
    if (!query) {
      return Alert.alert("Please enter a search query");
    }
  
  
    const params = {
      minCalories: caloriesValue[0].toString(),
      maxCalories: caloriesValue[1].toString(),
      minCookingTime: cookingValue[0].toString(),
      maxCookingTime: cookingValue[1].toString(),
      difficulty: selectedDifficulty,
    };
  
    router.push({
      pathname: query ? `/search/${encodeURIComponent(query)}` : '/search',
      params,
    });
    
  };

  return (
    <View style={{ flex: 1, paddingTop: 100, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.actionRow}>
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={Colors.primary}
                    onPress={router.back}
                  />
                  <TouchableOpacity style={styles.searchBtn}>
                    <Ionicons name="search" size={24} color={Colors.primary}></Ionicons>
                    <View>
                      <TextInput
                        style={{ fontFamily: "mon-sb", fontSize: 16 }}
                        placeholder="Try 'chicken', 'avocado'"
                        value={query}
                        onChangeText={(e) => setQuery(e)}
                      ></TextInput>
                    </View>
                  </TouchableOpacity>
                  <Ionicons
                    name="close-circle-outline"
                    size={24}
                    color={Colors.primary}
                    onPress={() => setQuery("")} // Clear text in TextInput
                  ></Ionicons>
                </View>
              </View>
            </SafeAreaView>
          ),
        }}
      />
      <Text style={styles.sectionTitle}>Calories</Text>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[caloriesValue[0], caloriesValue[1]]}
          onValuesChange={caloriesValuesChange}
          sliderLength={300}
          min={0}
          max={2000}
          step={1}
          allowOverlap={false}
          snapped={true}
          markerStyle={styles.markerStyle}
          selectedStyle={styles.selectedStyle}
          unselectedStyle={styles.unselectedStyle}
          minMarkerOverlapDistance={40}
          isMarkersSeparated={true}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.btnOutline}>
            <Text style={styles.minMaxText}>min</Text>
            <Text style={styles.btnOutlineText}>{caloriesValue[0]}</Text>
          </View>
          <Text style={styles.btnOutlineText}>-</Text>
          <View style={styles.btnOutline}>
            <Text style={styles.minMaxText}>max</Text>
            <Text style={styles.btnOutlineText}>{caloriesValue[1]}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Cooking time</Text>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[cookingValue[0], cookingValue[1]]}
          onValuesChange={cookingValuesChange}
          sliderLength={300}
          min={0}
          max={180}
          step={1}
          allowOverlap={false}
          snapped={true}
          markerStyle={styles.markerStyle}
          selectedStyle={styles.selectedStyle}
          unselectedStyle={styles.unselectedStyle}
          minMarkerOverlapDistance={40}
          isMarkersSeparated={true}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.btnOutline}>
            <Text style={styles.minMaxText}>min</Text>
            <Text style={styles.btnOutlineText}>{cookingValue[0]}</Text>
          </View>
          <Text style={styles.btnOutlineText}>-</Text>
          <View style={styles.btnOutline}>
            <Text style={styles.minMaxText}>max</Text>
            <Text style={styles.btnOutlineText}>{cookingValue[1]}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Difficulty</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={{ flex: 1 }}
          mode="dropdown"
          dropdownIconColor={Colors.primary}
          selectedValue={selectedDifficulty}
          onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
        >
          <Picker.Item label="Easy" value="Easy" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Hard" value="Hard" />
        </Picker>
      </View>
      <Animated.View style={[defaultStyles.footer, { backgroundColor: "transparent" }]} entering={SlideInDown.delay(200)}>
        <TouchableOpacity style={styles.btnGo} onPress={handleShowResults}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 16, color: "#fff" }}>Show results</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  btnGo: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    borderRadius: 32,
    height: "auto",
    width: "auto",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderRadius: 32,
    borderWidth: StyleSheet.hairlineWidth,
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 5,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon",
    fontWeight: "bold",
  },
  minMaxText: {
    fontFamily: 'mon',
    fontSize: 10,
    padding: 2,
  },
  container: {
    backgroundColor: "#fff",
    height: 60,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 8,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  sectionTitle: {
    marginTop: 20,
    padding: 15,
    fontFamily: "mon-sb",
    fontSize: 18,
  },
  sliderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  markerStyle: {
    backgroundColor: Colors.primary,
    height: 20,
    width: 20,
  },
  selectedStyle: {
    backgroundColor: Colors.primary,
  },
  unselectedStyle: {
    backgroundColor: Colors.grey,
  },
  pickerContainer: {
    bottom: 50,
  },
});
