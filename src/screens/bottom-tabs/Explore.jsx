import { View, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Input from '../../components/Input'
import { getDimensions } from '../../utils/getDimensions'
const {height, width} = getDimensions()

const categories = [
  {
    id: 1,
    name: "Fresh Fruits & Vegetables",
    image: require('../../../assets/images/fresh-fruit.png')
  },

  {
    id: 2,
    name: "Cooking Oil & Ghee",
   image: require('../../../assets/images/cooking-oil.png')
  },

  {
    id: 3,
    name: "Meat & Fish",
    image: require('../../../assets/images/meat-fish.png')
  },
  {
    id: 4,
    name: "Bakery & Snacks",
    image: require('../../../assets/images/bakery-snacks.png')
  },

  {
    id: 5,
    name: "Diary & Eggs",
    image: require('../../../assets/images/diary-eggs.png')
  },
  {
    id: 6,
    name: "Beverages",
    image: require('../../../assets/images/beverages.png')
  },
  {
    id: 7,
    name: "Staples & Pulses",
   image: require('../../../assets/images/staples-pulses.png')
  },
  {
    id: 8,
    name: "Rice, Flour & Grains",
     image: require('../../../assets/images/rice.jpg')
  },
  {
    id: 9,
    name: "Spices & Masalas",
    image: require('../../../assets/images/spices.jpg')
  },
  {
    id: 10,
    name: "Dry Fruits & Nuts",
    image: require('../../../assets/images/dry-fruits.png')
  }
]
const Explore = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <Text variant='headlineMedium' style={{ textAlign: 'center', marginVertical: 15 }} >Find Products </Text>

      <View>
        <Input
          placeholder={"Search Store"}
          style={{ borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 8, paddingHorizontal: 10, height: 55, marginHorizontal: 15, backgroundColor: '#F2F3F2' }}
          leftIcon={"search"}
        />
      </View>

     
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{paddingBottom:30}}
          renderItem={({ item }) => (
            <Pressable
              style={{
                marginLeft: 15,
                marginVertical: 10,
                elevation: 3,
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10,
                width: width * 0.45,
              }}
              onPress={() => navigation.getParent()?.navigate("product-category", {category: item})}
            >
              <View>
                <Image
                  source={item.image}
                  style={{
                    width: width * 0.35,
                    height: height * 0.15,
                    borderRadius: 10,
                    alignSelf: 'center',
                    resizeMode:'contain'
                  }}
                />
                <Text variant='titleSmall' style={{ marginTop: 5, textAlign:'center' }}>{item.name}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
    
    </View>
  )
}

export default Explore