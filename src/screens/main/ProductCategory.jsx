import { View, FlatList, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import Card from '../../components/Card';
import { getDimensions } from '../../utils/getDimensions';
import Input from '../../components/Input';
const { width, height } = getDimensions()
const products = [
    {
        id: 1,
        name: "Diet Coke Can",
        image: "https://136975773.cdn6.editmysite.com/uploads/1/3/6/9/136975773/ABSYCBLIM6I5ECF7HKM73I3I.png",
        unit: "ml",
        unitValue: 330,
        price: 180,
        description: "Sugar-free carbonated soft drink with the classic Coke taste.",
        rating: 4.3
    },
    {
        id: 2,
        name: "Sprite Can",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrAtLaePgtTAjJbB1weFqHEGRF5lmFoqWVHw&s",
        unit: "ml",
        unitValue: 330,
        price: 170,
        description: "Refreshing lemon-lime flavored carbonated soft drink.",
        rating: 4.2
    },
    {
        id: 3,
        name: "Apple & Grape Juice",
        image: "https://img.freepik.com/premium-photo/glass-grape-apple-juice-isolated_124717-688.jpg",
        unit: "ml",
        unitValue: 1000,
        price: 320,
        description: "A refreshing blend of apple and grape juice with no added preservatives.",
        rating: 4.4
    },
    {
        id: 4,
        name: "Orange Juice",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPreAcEslLsa7XkZ4sil6DG5rFFUqJBJkmpg&s",
        unit: "ml",
        unitValue: 1000,
        price: 300,
        description: "Fresh and tangy orange juice rich in vitamin C.",
        rating: 4.5
    },
    {
        id: 5,
        name: "Coca-Cola Can",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoY3LD_j0GuHgJmGRPEawiUag6Ue6hwRxdXA&s",
        unit: "ml",
        unitValue: 330,
        price: 170,
        description: "Classic Coca-Cola soft drink with a bold and refreshing taste.",
        rating: 4.4
    },
    {
        id: 6,
        name: "Pepsi Can",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9VFkHmzRS_JANiNwYz8hOzak2Ey1vL6UTw&s",
        unit: "ml",
        unitValue: 330,
        price: 170,
        description: "Carbonated cola beverage with a smooth and refreshing flavor.",
        rating: 4.3
    }
];

const ProductCategory = ({ navigation, route }) => {
    const { category } = route.params
    const [checkedItems, setCheckedItems] = useState({});


    useLayoutEffect(() => {
        navigation.setOptions({
            title: category.name || "Product",
        });
    }, [navigation, category]);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >

            <View style={{flexDirection:'row', alignItems:'center'}} >
                <Input
                    placeholder={"Search product"}
                    style={{ borderWidth: 1, borderColor: '#e8e8e8', borderRadius: 8, paddingHorizontal: 10, height: 55, marginHorizontal: 15, backgroundColor: '#F2F3F2', flex:1 }}
                    leftIcon={"search"}
                />
                <TouchableOpacity
                
                onPress={()=>navigation.navigate("filter-product", {onApply: (newCheckedItems) => setCheckedItems(newCheckedItems), checkedItems: checkedItems})}
                >
                                        
                <Image source={require('../../../assets/images/filter.png')} style={{height:25, width:25, resizeMode:'contain', marginRight:20}}   />
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                numColumns={2}
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
                    // onPress={() => handleNavigation(item)}
                    >
                        <Card item={item} />
                    </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default ProductCategory