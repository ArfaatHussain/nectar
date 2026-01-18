import { View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { getDimensions } from '../../utils/getDimensions'
import { Text, Icon } from 'react-native-paper'
import CustomButton from '../../components/Button';

const { width, height } = getDimensions();

const Register = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView contentContainerStyle={{paddingBottom:50}} >
        <View style={{ flex: 1}} >
          <Image
            source={require('../../../assets/images/carrot.png')}
            style={{
              alignSelf: 'center',
              width: width * 0.5,
              height: height * 0.15,
              resizeMode: 'contain',
              marginTop: 30,
            }}
          />

          <View style={{ marginTop: 20, paddingHorizontal: width * 0.06 }}>
            <Text variant="displaySmall">Sign Up</Text>
            <Text style={{ marginTop: 10, color: '#808080' }}>
              Create an account to continue
            </Text>

            {/* Username */}
            <Text style={{ marginTop: 30, color: '#808080' }}>Name</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e8e8e8',
                marginTop: 10,
              }}
            />

            {/* Email */}
            <Text style={{ marginTop: 30, color: '#808080' }}>Email</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e8e8e8',
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                keyboardType="email-address"
                style={{ flex: 1 }}
              />
              <Icon source="email-outline" size={18} color="#808080" />
            </View>

            {/* Password */}
            <Text style={{ marginTop: 30, color: '#808080' }}>Password</Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e8e8e8',
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextInput
                style={{ flex: 1 }}
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  source={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="#808080"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{marginHorizontal: width * 0.06, color:'#808080', marginVertical:20}} >By continuing, you agree to our <Text style={{color:'#53B175'}} >Terms of Service</Text> and <Text style={{color:'#53B175'}}>Privacy Policy</Text></Text>

          <CustomButton buttonText={"Sign up"} style={{alignSelf:'center'}} />

          <Text style={{alignSelf:'center', marginTop:10, fontWeight:'700'}} >Already have an account? <Text style={{color:'#53B175'}} 
          onPress={()=>navigation.navigate("login")}
          >Login</Text></Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register
