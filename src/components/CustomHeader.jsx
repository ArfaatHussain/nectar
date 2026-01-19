// components/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Entypo } from '@expo/vector-icons'; // or any icon library
import { getDimensions } from '../utils/getDimensions';
const {width, height} =getDimensions()
const CustomHeader = ({ title, showBack = true, height = 60, back }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { height: height }]}>
            <View style={styles.inner}>
                {showBack && (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>

                        {
                            back ?
                                <Entypo name="cross" size={height / 2} color="black"  />
                                : <Ionicons name="arrow-back" size={height/2} color="#000" />
                        }
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: 40
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        flex: 1,
    },
    title: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
});

export default CustomHeader;
