import { View, Text, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';

interface Props {
   recipes: any[];
  }
const Recipes = ({recipes: items}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const recipeRef = useRef<FlatList>(null);
  useEffect(() => {
    console.log('RELOAD RECIPES:', items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [items]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`}>
      Go there
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