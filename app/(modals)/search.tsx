import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

const search = () => {
  return (
    <View style={{flex: 1}}>
        <View style={defaultStyles.container}>
            <Text>SEARCH PAGE</Text>
        </View>
    </View>
  )
}

export default search