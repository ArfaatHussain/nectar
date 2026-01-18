import { View, Image, FlatList, ScrollView, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native'
import React, {useCallback} from 'react'
import { useExitOnBack } from '../../utils/useExitOnBack'
import { getDimensions } from '../../utils/getDimensions'
import { Avatar, Icon, Text } from 'react-native-paper'
import { Ionicons } from "@expo/vector-icons";
import Input from '../../components/Input'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const { width, height } = getDimensions();
import useStore from '../../store/useStore'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const DOT_SIZE = width * 0.018;        // adjust multiplier if needed
const DOT_RADIUS = DOT_SIZE / 2;
const DOT_SPACING = width * 0.01;
const Home = ({ navigation }) => {
  useExitOnBack();
  const user = useStore((state) => state.user)
  useFocusEffect(
    useCallback(() => {
      const getCartFromAsync = async () => {
        const cartStringFromStorage = await AsyncStorage.getItem("cart")
        const cartFromStorage = cartStringFromStorage ? JSON.parse(cartStringFromStorage) : []
        useStore.setState({ cart: cartFromStorage });
      }

      getCartFromAsync()
    }, [])
  )
  const images = [
    require("../../../assets/images/slider1.jpg"),
    require("../../../assets/images/slider2.webp"),
    require("../../../assets/images/slider3.jpg"),
  ];
  const exclusiveOffers = [
    {
      id: 1,
      name: 'Oragnic Bananas',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI3dY2qTBXlgquADoQqmmxfzR0Nu_GTts1Lw&s",
      unit: "pcs",
      unitValue: 7,
      price: 150,
      description: "Fresh organic bananas rich in potassium and perfect for a healthy snack.",
      rating: 4.5
    },
    {
      id: 2,
      name: "Red Apple",
      image: "https://img.freepik.com/free-psd/close-up-delicious-apple_23-2151868338.jpg?semt=ais_hybrid&w=740&q=80",
      unit: "kg",
      unitValue: 1,
      price: 200,
      description: "Crisp and juicy red apples, perfect for eating fresh or baking into your favorite desserts.",
      rating: 4.2
    },
    {
      id: 3,
      name: "Organic Grapes",
      image: "https://static.vecteezy.com/system/resources/previews/052/389/124/non_2x/fresh-organic-grapes-with-green-leaves-blooming-on-a-transparent-background-ready-for-healthy-snacking-or-culinary-use-fresh-organic-grape-with-leaves-on-transparent-background-free-png.png",
      unit: "kg",
      unitValue: 1,
      price: 180,
      description: "Sweet and seedless organic grapes, perfect for snacking or adding to salads.",
      rating: 4.7
    }
  ]

  const bestSelling = [
    {
      id: 1,
      name: "Strawberries",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0ezu3hXinyXiwiRYkmfSFqjn_uGrjiiX_w&s",
      unit: "box",
      unitValue: 1,
      price: 250,
      description: "Fresh and juicy strawberries, perfect for desserts, smoothies, or snacking.",
      rating: 4.8
    },
    {
      id: 2,
      name: "Blueberries",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7DBK2SvKxS9OGvwEUPUKwQzHRrkHJUyniyw&s",
      unit: "box",
      unitValue: 1,
      price: 300,
      description: "Plump and sweet blueberries, great for baking, smoothies, or enjoying on their own.",
      rating: 3.9
    },
    {
      id: 3,
      name: "Mangoes",
      image: "https://static.vecteezy.com/system/resources/thumbnails/026/795/003/small/mango-fruit-tropical-transparent-png.png",
      unit: "kg",
      unitValue: 1,
      price: 400,
      description: "Ripe and juicy mangoes, perfect for eating fresh, smoothies, or adding to desserts.",
      rating: 4.6
    }

  ]

  const handleNavigation = (product) => {
    navigation.getParent()?.navigate("product-detail", { product });

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} >


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }} >
          <Avatar.Image size={40} source={{ uri: user?.avatar }} />
          <Text variant='titleLarge' >{user?.name}</Text>
          <Ionicons name="notifications-outline" size={height * 0.030} color="#808080" />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Ionicons
            name="location"
            size={height * 0.03}
            color="#808080"
          />
          <Text>Awan Shareef, Attock</Text>
        </View>

        <View>
          <Input
            placeholder={"Search Store"}
            style={{ borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 8, paddingHorizontal: 10, height: 55, marginHorizontal: 15, backgroundColor: '#F2F3F2' }}
            leftIcon={"search"}
          />
        </View>

        <View style={{ height: height * 0.23, marginVertical: 20, marginHorizontal: 15, }} >
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor="#53B175"
            paginationDefaultColor="#ccc"
            paginationStyleItem={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_RADIUS,
              marginHorizontal: DOT_SPACING,
            }}
            paginationStyleItemActive={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_RADIUS,
            }}
          >
            {images.map((img, index) => (
              <View key={index} style={{ width }}>
                <Image
                  source={img}
                  style={{ width, height: height * 0.25 }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </SwiperFlatList>
        </View>

        {/* Exclusive Offer Section  */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }} >
          <Text variant='titleSmall' style={{ marginBottom: 10 }} >Exclusive Offer</Text>
          <Text variant='bodyMedium' style={{ color: '#53B175', }} >See all</Text>
        </View>

        <View >
          <FlatList
            data={exclusiveOffers}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
                onPress={() => handleNavigation(item)}
              >
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: width * 0.3,
                      height: height * 0.15,
                      borderRadius: 10,
                      alignSelf: 'center',
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
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>


        {/* Best Selling Section  */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }} >
          <Text variant='titleSmall' style={{ marginBottom: 10 }} >Best Selling</Text>
          <Text variant='bodyMedium' style={{ color: '#53B175', }} >See all</Text>
        </View>

        <View>
          <FlatList
            data={bestSelling}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
                onPress={() => handleNavigation(item)}
              >
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: width * 0.3,
                      height: height * 0.15,
                      borderRadius: 10,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text variant='titleSmall' style={{ marginTop: 5 }}>{item.name}</Text>
                  <Text variant='bodyMedium' style={{ color: '#808080' }}>{item.unitValue} {item.unit}</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant='titleSmall' style={{ marginTop: 5 }}>Rs {item.price}</Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ backgroundColor: '#53B175', padding: 5, borderRadius: 10 }}>
                      <Ionicons name="add" size={height * 0.025} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

      </ScrollView>

    </View>
  )
}

export default Home