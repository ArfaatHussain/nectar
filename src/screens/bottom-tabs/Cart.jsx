import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useCallback, useState, useRef, useMemo } from 'react'
import { Text } from 'react-native-paper'
import { getDimensions } from '../../utils/getDimensions'
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import CustomButton from '../../components/Button';
const { height, width } = getDimensions()
import useStore from '../../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
const Cart = ({ navigation }) => {
  const { cart, setCart } = useStore()

  const [sheetOpen, setSheetOpen] = useState(false);
  const [totalCost, setTotalCost] = useState(0)

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['50%'], []);
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setSheetOpen(false);
    }
  }, []);

  const openSheet = () => {

    let cost = 0;
    cart.map((item) => {
      cost += (item.price * item.quantity)
    })

    setTotalCost(cost)
    setSheetOpen(true); // hide button immediately
    bottomSheetRef.current?.snapToIndex(0);
  };


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

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );



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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text variant="headlineMedium">Checkout</Text>

          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
            <Text variant='bodyLarge' style={{ color: '#808080', flex: 1 }} >Delivery</Text>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text variant='labelLarge' style={{ marginRight: 10 }} >Select Method</Text>
                <AntDesign name="right" size={width * 0.05} color="black" />
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
            <Text variant='bodyLarge' style={{ color: '#808080', flex: 1 }} >Payment</Text>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Image source={require('../../../assets/images/card.png')}
                  style={{ height: height * 0.05, width: width * 0.07, resizeMode: 'contain', marginRight: 10 }}
                />
                <AntDesign name="right" size={width * 0.05} color="black" />
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
            <Text variant='bodyLarge' style={{ color: '#808080', flex: 1 }} >Promo Code</Text>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text variant='labelLarge' style={{ marginRight: 10 }} >Pick discount</Text>
                <AntDesign name="right" size={width * 0.05} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
            <Text variant='bodyLarge' style={{ color: '#808080', flex: 1 }} >Total Cost</Text>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text variant='labelLarge' style={{ marginRight: 10 }} >Rs {totalCost}</Text>
                <AntDesign name="right" size={width * 0.05} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ color: '#808080', marginTop: 30 }} >By placing an order you agree to our <Text style={{ color: '#53B175' }} >Terms</Text> and  <Text style={{ color: '#53B175' }} >Conditions</Text></Text>

          <CustomButton
            buttonText={"Place Order"}
            style={{ width: '100%', alignSelf: 'center', marginTop: 30 }}
            onPress={async () => {
              setCart([]);
              await AsyncStorage.removeItem("cart");

              // let the close animation start, then navigate
              setTimeout(() => {
                navigation.getParent()?.navigate("order-accepted");
              }, 150);

              bottomSheetRef.current?.close();
              setSheetOpen(false);
            }}
          />

        </BottomSheetView>
      </BottomSheet>

      {!sheetOpen && (
        <CustomButton
          buttonText="Checkout"
          style={{ width: '90%', alignSelf: 'center' }}
          onPress={openSheet}
          disabled={cart?.length === 0 ? true : false}

        />
      )}

    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { textAlign: 'center', marginVertical: 15 },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: '#fff',
    zIndex: 10,
    paddingBottom: 10
  },
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