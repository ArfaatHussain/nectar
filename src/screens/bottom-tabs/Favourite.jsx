import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getDimensions } from '../../utils/getDimensions';
import { AntDesign } from "@expo/vector-icons";
import CustomButton from '../../components/Button';

const { width, height } = getDimensions();

const Favourite = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchFavourites = async () => {
        try {
          const favoritesKey = 'favorites';
          const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
          const favorites = favoritesJSON ? JSON.parse(favoritesJSON) : [];
          console.log(favorites)
          setFavourites(favorites);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      };

      fetchFavourites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text variant='headlineMedium' style={styles.header}>Favourites</Text>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.getParent()?.navigate("product-detail", { product: item })}
            style={{
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              marginTop: 15
            }}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text variant="titleMedium">{item.name}</Text>
                <Text variant="bodyMedium" style={styles.unitText}>{item.unitValue} {item.unit}</Text>
              </View>
              <Text variant="labelLarge">Rs {item.price}</Text>
              <AntDesign name="right" size={18} color="black" style={{ marginLeft: 20 }} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text variant="bodyMedium" style={styles.emptyText}>
              No favourites added yet.
            </Text>
          </View>
        )}
      />

      {
        favourites.length > 0 && <CustomButton
          buttonText={"Add All To Cart"}
          style={{ alignSelf: 'center', width: '90%' }}
          onPress={()=>navigation.getParent()?.navigate("order-accepted")}
        />
      }

    </View>
  );
};

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
});

export default Favourite;
