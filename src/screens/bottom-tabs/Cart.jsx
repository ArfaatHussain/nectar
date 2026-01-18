import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useCallback, useState, useRef } from 'react'
import { Text } from 'react-native-paper'
import { getDimensions } from '../../utils/getDimensions'
import { AntDesign, Entypo } from "@expo/vector-icons";
import CustomButton from '../../components/Button';
import { useFocusEffect } from '@react-navigation/native';
const { height, width } = getDimensions()
import useStore from '../../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
const Cart = ({ navigation }) => {
  const { cart, setCart } = useStore()
  console.log("Cart from store: ", cart)

  // ref
  // const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const increment = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  const decrement = (id) => {
    setCart(
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  const deleteItem = async (id) => {
    const filteredCart = cart.filter((item) => item.id !== id)
    setCart(filteredCart)
    await AsyncStorage.setItem("cart", JSON.stringify(filteredCart))
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <Text variant='headlineMedium' style={{ textAlign: 'center', marginVertical: 15 }} >My Cart</Text>


      <FlatList
        data={cart}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => {

          return (
            <TouchableOpacity
              onPress={() => navigation.getParent()?.navigate("product-detail", { product: item })}
              style={styles.itemContainer}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.content}>
                  <View style={styles.topRow}>
                    <Text variant="labelLarge" style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Entypo name="cross" size={width * 0.06} color="black" onPress={() => deleteItem(item.id)} />
                  </View>

                  <Text variant="bodySmall" style={styles.unitText}>
                    {item.unitValue}{item.unit}
                  </Text>

                  <View style={styles.bottomRow}>
                    <View style={styles.qtyRow}>
                      <AntDesign
                        name="minus"
                        size={22}
                        color="#808080"
                        onPress={() => decrement(item.id)}
                      />
                      <Text variant="bodyLarge" style={styles.qtyText}>
                        {item.quantity}
                      </Text>
                      <AntDesign
                        name="plus"
                        size={22}
                        color="#53B175"
                        onPress={() => increment(item.id)}
                      />
                    </View>

                    <Text variant="labelLarge">
                      Rs {item.price * item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}

        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text variant="bodyMedium" style={styles.emptyText}>
              No products added yet.
            </Text>
          </View>
        )}
      />

      {/* <BottomSheet
        // ref={bottomSheetRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet> */}

      <CustomButton
        buttonText={"Checkout"}
        style={{ width: '90%', alignSelf: 'center' }}

      />


    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { textAlign: 'center', marginVertical: 15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { height: height * 0.09, width: width * 0.15, resizeMode: 'contain' },
  info: { paddingLeft: 20, flex: 1 },
  unitText: { color: '#808080' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 },
  emptyText: { color: '#808080' },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40%',
  },
  counterIconSize: height * 0.03,
  counterText: {
    textAlign: 'center',
  },
  priceText: {
    textAlign: 'right',
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: width * 0.18,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    marginRight: 10,
  },
  unitText: {
    color: '#808080',
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  qtyText: {
    marginHorizontal: 12,
  },
});