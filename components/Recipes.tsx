import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Props {
   recipes: any[];
  }
const Recipes = ({recipes: items}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const recipeRef = useRef<FlatList>(null);
  useEffect(() => {
    console.log('RELOAD RECIPES:', items.length); // Add null check before accessing length
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [items]);
  
  const renderRow: ListRenderItem<any> = ({ item }) => (

    
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.recipes}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity style={{position: 'absolute', right: 30, top: 30, alignItems:'center'}}>
            <Ionicons name='heart-outline' size={26} color={'#fff'}></Ionicons>
            <Text style={{fontFamily:'mon-sb', fontSize:12, backgroundColor: '#fff', color: Colors.grey, borderRadius: 12, textAlign:'center', width:40, height:20, verticalAlign:'middle', marginTop: 5}}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{position: 'absolute', left: 30, top: 30, alignItems:'center'}}>
            <Text style={{fontFamily:'mon-sb', fontSize:14, backgroundColor: '#fff', color: Colors.grey, borderRadius: 12, textAlign:'center', verticalAlign:'middle', marginTop: 5, width:150, height: 30}}>{item.chef}</Text>
          </TouchableOpacity>
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{item.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name='time-outline' size={20} color={Colors.dark}></Ionicons>
            <Text style={styles.infoText}>{item.time}</Text>
            <Text style={styles.divider}></Text>
            <Ionicons name='egg-outline' size={20} color={Colors.dark}></Ionicons>
            <Text style={styles.infoText}>{item.difficulty}</Text>
            <Text style={styles.divider}></Text>
            <Ionicons name='flame-outline' size={20} color={Colors.dark}></Ionicons>
            <Text style={styles.infoText}>{item.calories}</Text>
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
      />
    </View>
  )
}

export default Recipes

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  recipes:{
    padding:  16,
  },
  divider: {
    width: 1,
    height: 15, 
    backgroundColor: Colors.primary, 
  },
  image:{
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    bottom: 5,
    left: 16,
    padding: 5,
    height: 50,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
        width: 1,
        height: 1,
    },
  },
  infoText: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 14, 
    color: Colors.dark,
  },
  recipeNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    left: 30,
    width: '90%',
  },
  recipeName: {
    fontFamily: 'mon-sb', 
    fontSize: 20, 
    color: '#fff',
    padding: 10,
  }
})