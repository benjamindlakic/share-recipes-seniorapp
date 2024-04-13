import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import recipeData from '@/assets/data/recipes.json'
import Animated from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

const IMG_HEIGHT = 300;
const { width } = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const recipe = (recipeData as any[]).find((item)=> item.id === id);    
  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <Animated.Image source={{uri: recipe.image}} style={styles.image}/>
        <View style={{flex: 1}}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <View style={{position:'absolute', marginTop: 20, right:0, height: 50, width: 50}}>
            <TouchableOpacity>
              <Ionicons name='heart-outline' size={26} color={'#000'}></Ionicons>
              <Text style={{fontFamily:'mon', fontSize: 16}}>{recipe.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name='chatbubble-outline' size={26} color={'#000'} style={{marginTop: 20}}></Ionicons>
              <Text style={{fontFamily:'mon', fontSize: 14}}>140</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.recipeDescription}>{recipe.description.slice(0, 100)}...</Text>
        </View>
        
      </Animated.ScrollView>
    </View>
  )
}

export default Page
const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff'
  },
  image:{
    height: IMG_HEIGHT,
    width,
  },
  recipeName:{
    fontFamily: 'mon-sb',
    fontSize: 22,
    padding: 15,
    width: '85%',
  },
  recipeDescription:{
    fontFamily: 'mon',
    fontSize: 16,
    padding: 15,
    width: '85%',
  
  }
})