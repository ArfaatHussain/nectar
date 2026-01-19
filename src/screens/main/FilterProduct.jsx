import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { Checkbox } from 'expo-checkbox';
import CustomButton from '../../components/Button';

const CheckboxItem = ({ label, isChecked, setChecked }) => (
    <View style={styles.section}>
        <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#53B175' : undefined}
        />
        <Text style={styles.paragraph}>{label}</Text>
    </View>
);

const FilterProduct = ({ navigation, route }) => {
    const { checkedItems: initialItems, onApply } = route.params;
    const [checkedItems, setCheckedItems] = useState(initialItems || {});

    const toggleItem = (key) => {
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleApply = () => {
        if (onApply) onApply(checkedItems); // send updated state back
        navigation.goBack();
    };

    const categories = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
    const brands = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmos'];

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
            <Text variant='headlineMedium' style={{ marginVertical: 20 }} >Categories</Text>
            {categories.map((item, index) => (
                <CheckboxItem
                    key={item}
                    label={item}
                    isChecked={!!checkedItems[item]}
                    setChecked={() => toggleItem(item)}
                />
            ))}

            <Text variant='headlineMedium' style={{ marginVertical: 20 }}>Brand</Text>
            {brands.map(item => (
                <CheckboxItem
                    key={item}
                    label={item}
                    isChecked={!!checkedItems[item]}
                    setChecked={() => toggleItem(item)}
                />
            ))}

            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                <CustomButton
                    buttonText={"Apply Filter"}
                    style={{ width: '90%', alignSelf: 'center' }}
                      onPress={handleApply}
                />
            </View>
        </View>
    );
};

export default FilterProduct;

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
        borderRadius: 4,
        height: 25,
        width: 25,
    },
});
