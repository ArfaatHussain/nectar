import { View, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { getDimensions } from '../../utils/getDimensions'
import CustomButton from '../../components/Button'
const { width, height } = getDimensions()
const OrderFailed = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../../../assets/images/order-failed.png')} style={{ height: height * 0.25, width: width * 0.80, resizeMode: 'contain' }} />
                <Text variant='headlineSmall' style={{fontWeight:'700', textAlign:'center', marginHorizontal:20, marginBottom:15, marginTop:25}} >Oops! Order Failed</Text>
                <Text variant='bodyMedium' style={{textAlign:'center', marginHorizontal:20, color:'#808080'}} >Something went tembly wrong.</Text>
            </View>

            <CustomButton 
            buttonText={"Please Try Again"}
            style={{width:'90%', alignSelf:'center'}}
            onPress={()=>navigation.goBack()}
            />

            <CustomButton 
            buttonText={"Back to home"}
            style={{width:'90%', alignSelf:'center', backgroundColor:'transparent', }}
            textColor={"black"}
            onPress={()=>navigation.replace("tabs",{screen:"home"})}
            />
        </View>
    )
}

export default OrderFailed