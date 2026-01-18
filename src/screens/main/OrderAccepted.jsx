import { View, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { getDimensions } from '../../utils/getDimensions'
import CustomButton from '../../components/Button'
const { width, height } = getDimensions()
const OrderAccepted = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../../../assets/images/order-accepted.png')} style={{ height: height * 0.25, width: width * 0.80, resizeMode: 'contain' }} />
                <Text variant='headlineSmall' style={{ fontWeight: '700', textAlign: 'center', marginHorizontal: 20, marginVertical: 15 }} >Your Order has been accepted</Text>
                <Text variant='bodyMedium' style={{ textAlign: 'center', marginHorizontal: 20, color: '#808080' }} >Your items has been placed and is on it's way to being processed.</Text>
            </View>

            <CustomButton
                buttonText={"Track Order"}
                style={{ width: '90%', alignSelf: 'center' }}
                onPress={() => navigation.goBack()}
            />

            <CustomButton
                buttonText={"Back to home"}
                style={{ width: '90%', alignSelf: 'center', backgroundColor: 'transparent', }}
                textColor={"black"}
                onPress={() => navigation.replace("tabs", { screen: "home" })}
            />
        </View>
    )
}

export default OrderAccepted