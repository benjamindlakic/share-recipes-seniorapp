import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import SearchHeader from "@/components/SearchHeader";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Picker } from "@react-native-picker/picker";

const filter = () => {
  const [caloriesValue, setCaloriesValue] = React.useState([0, 2000]);
  const [cookingValue, setCookingValue] = React.useState([0, 180]);
  const [selectedDifficulty, setSelectedDifficulty] = useState();



  const caloriesValuesChange = (
    values: React.SetStateAction<number[]>
  ) => setCaloriesValue(values);

  const cookingValuesChange = (
    values: React.SetStateAction<number[]>
  ) => setCookingValue(values);


  return (
    <View style={{ flex: 1, paddingTop: 100, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          header: () => <SearchHeader />,
        }}
      />
      <Text
        style={{
          marginTop: 20,
          padding: 15,
          fontFamily: "mon-sb",
          fontSize: 18,
        }}
      >
        Calories
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MultiSlider
          values={[caloriesValue[0], caloriesValue[1]]}
          onValuesChange={caloriesValuesChange}
          sliderLength={300}
          min={0}
          max={2000}
          step={1}
          allowOverlap={false}
          snapped={true}
          markerStyle={{
            backgroundColor: Colors.primary,
            height: 20,
            width: 20,
          }}
          selectedStyle={{ backgroundColor: Colors.primary }}
          unselectedStyle={{ backgroundColor: Colors.grey }}
          minMarkerOverlapDistance={40}
          isMarkersSeparated={true}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.btnOutline}>
            <Text style={{fontFamily: 'mon', fontSize: 10, padding: 2}}>min</Text>
            <Text style={styles.btnOutlineText}>{caloriesValue[0]}</Text>
          </View>
          <Text style={styles.btnOutlineText}>-</Text>
          <View style={styles.btnOutline}>
            <Text style={{fontFamily: 'mon', fontSize: 10, padding: 2}}>max</Text>
            <Text style={styles.btnOutlineText}>{caloriesValue[1]}</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 20,
          padding: 15,
          fontFamily: "mon-sb",
          fontSize: 18,
        }}
      >
        Cooking time
      </Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MultiSlider
          values={[cookingValue[0], cookingValue[1]]}
          onValuesChange={cookingValuesChange}
          sliderLength={300}
          min={0}
          max={180}
          step={1}
          allowOverlap={false}
          snapped={true}
          markerStyle={{
            backgroundColor: Colors.primary,
            height: 20,
            width: 20,
          }}
          selectedStyle={{ backgroundColor: Colors.primary }}
          unselectedStyle={{ backgroundColor: Colors.grey }}
          minMarkerOverlapDistance={40}
          isMarkersSeparated={true}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.btnOutline}>
            <Text style={{fontFamily: 'mon', fontSize: 10, padding: 2}}>min</Text>
            <Text style={styles.btnOutlineText}>{cookingValue[0]}</Text>
          </View>
          <Text style={styles.btnOutlineText}>-</Text>
          <View style={styles.btnOutline}>
            <Text style={{fontFamily: 'mon', fontSize: 10, padding: 2}}>max</Text>
            <Text style={styles.btnOutlineText}>{cookingValue[1]}</Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          marginTop: 20,
          padding: 15,
          fontFamily: "mon-sb",
          fontSize: 18,
        }}
      >
        Difficulty
      </Text>
          <View style={{bottom:50}}>
            <Picker
              style={{flex:1}}
              mode="dropdown"
              dropdownIconColor={Colors.primary}
              selectedValue={selectedDifficulty}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDifficulty(itemValue)
              }
            >
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
          </View>
      <Animated.View
        style={[defaultStyles.footer, { backgroundColor: "transparent" }]}
        entering={SlideInDown.delay(200)}
      >
        <TouchableOpacity style={styles.btnGo}>
          <Text style={{ fontFamily: "mon-sb", fontSize: 16, color: "#fff" }}>
            Show results
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default filter;

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
    backgroundColor: "#transparent",
    borderRadius: 32,
    borderWidth: StyleSheet.hairlineWidth,
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 5
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon",
    fontWeight: "bold",
  },
});
