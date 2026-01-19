import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { getDimensions } from '../utils/getDimensions'
const {height, width} = getDimensions()
import { Ionicons } from "@expo/vector-icons";
const Card = ({item}) => {
    return (
        <View>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: width * 0.3,
                    height: height * 0.15,
                    borderRadius: 10,
                    alignSelf: 'center',
                    resizeMode:'contain'
                }}
            />
            <Text variant='titleSmall' style={{ marginTop: 5 }}>{item.name}</Text>
            <Text variant='bodyMedium' style={{ color: '#808080' }}>{item.unitValue} {item.unit}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                <Text variant='titleSmall'>Rs {item.price}</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ backgroundColor: '#53B175', padding: 5, borderRadius: 10 }}>
                    <Ionicons name="add" size={height * 0.025} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card