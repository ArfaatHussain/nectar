import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { getDimensions } from '../../utils/getDimensions';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';
import CustomButton from '../../components/Button';
import { useFocusEffect } from '@react-navigation/native';
import toast from "react-native-simple-toast"
const { width, height } = getDimensions();
import useStore from '../../store/useStore';
const ProductDetail = ({ route }) => {
    const { product } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState( product?.quantity || 1);
    const { cart, addToCart } = useStore()

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const favoritesKey = 'favorites';
            const favorites = JSON.parse(await AsyncStorage.getItem(favoritesKey)) || [];
            console.log("Favourites: ", favorites);
            const exists = favorites.some(item => item.id === product.id);
            setIsFavorite(exists);
        };

        checkFavoriteStatus();
    }, []);


    const handleAddToCart = async () => {
        const productForCart = {
            ...product,
            quantity: quantity
        }

        addToCart(productForCart)
        toast.show("Product has been added to your cart.")
    }

    const toggleFavorite = async (product) => {
        try {
            const favoritesKey = 'favorites';

            const favoritesJSON = await AsyncStorage.getItem(favoritesKey);
            let favorites = favoritesJSON ? JSON.parse(favoritesJSON) : [];

            const index = favorites.findIndex(item => item.id === product.id);

            if (index > -1) {
                favorites.splice(index, 1);
                setIsFavorite(false);
            } else {
                favorites.push(product);
                setIsFavorite(true);
            }
            await AsyncStorage.setItem(favoritesKey, JSON.stringify(favorites));
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.productImage} />

            <View style={styles.headerRow}>
                <Text variant="headlineMedium">{product.name}</Text>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={styles.iconSize} color={isFavorite ? "red" : "#808080"} onPress={() => toggleFavorite(product)} />
            </View>

            <Text style={styles.unitText}>{product.unitValue}{product.unit}</Text>

            <View style={styles.priceRow}>
                <View style={styles.counterRow}>
                    <AntDesign name="minus" size={styles.counterIconSize} color="#808080" onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
                    <Text variant="bodyLarge" style={styles.counterText}>{quantity}</Text>
                    <AntDesign name="plus" size={styles.counterIconSize} color="#53B175" onPress={() => setQuantity(quantity + 1)} />
                </View>

                <Text variant="titleLarge" style={styles.priceText}>Rs {product.price * quantity}</Text>
            </View>

            <Text variant='titleMedium' style={styles.sectionTitle}>Product Detail</Text>

            <Text style={styles.descriptionText}>
                {product.description || 'No description available'}
            </Text>

            <View style={styles.nutritionRow}>
                <Text variant='titleSmall'>Nutritions</Text>
                <Text variant='bodySmall' style={styles.gramsText}>100gr</Text>
            </View>

            <View style={[styles.nutritionRow, { marginTop: 10 }]}>
                <Text variant='titleSmall'>Rating</Text>
                <StarRatingDisplay rating={4.5} color='#F3603F' starSize={20} />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 15 }} >
                <CustomButton
                    buttonText={"Add To Cart"}
                    style={{ alignSelf: 'center', width: '90%' }}
                    onPress={handleAddToCart}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productImage: {
        width: '100%',
        height: height * 0.3,
        resizeMode: 'contain',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    iconSize: height * 0.04,
    unitText: {
        color: '#808080',
        marginLeft: 10,
        marginTop: 5,
    },
    priceRow: {
        marginVertical: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
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
    sectionTitle: {
        marginLeft: 10,
    },
    descriptionText: {
        marginHorizontal: 10,
        marginTop: 10,
        color: '#808080',
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
    },
    gramsText: {
        color: '#808080',
    },
});

export default ProductDetail;
