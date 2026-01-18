import { View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { getDimensions } from '../../utils/getDimensions'
import { Text, Icon } from 'react-native-paper'
import CustomButton from '../../components/Button';

const { width, height } = getDimensions();
import { useExitOnBack } from '../../utils/useExitOnBack';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../../store/useStore';
const Login = ({navigation}) => {
  useExitOnBack();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useStore()

  const handleLogin = async() => {
    if (!email || !password) {
      toast.show('Please fill in all fields');
      return;
    }

    const user = {
      email,
      password,
      name: "Arfaat Hussain",
      address: "Awan Shareef, Attock",
      avatar: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80"
    }

    setUser(user)

   await AsyncStorage.setItem("user", JSON.stringify(user))

   navigation.getParent()?.replace("tabs",{screen:"home"})
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView contentContainerStyle={{paddingBottom:50}} >
        <View style={{ flex: 1, }} >
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
            <Text variant="displaySmall">Login</Text>
            <Text style={{ marginTop: 10, color: '#808080' }}>
              Please enter the details below to continue to your account
            </Text>

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
                value={email}
                onChangeText={setEmail}
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
                value={password}
                onChangeText={setPassword}
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

          <Text style={{marginHorizontal: width * 0.06, marginVertical:20, alignSelf:'flex-end', fontWeight:'600'}} >Forgot Password?</Text>

          <CustomButton buttonText={"Login"} style={{alignSelf:'center'}}
          onPress={handleLogin}
          />

          <Text 
          onPress={()=>navigation.navigate("register")}
          style={{alignSelf:'center', marginTop:10, fontWeight:'700'}} >Don't have an account? <Text style={{color:'#53B175'}} >Signup</Text></Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
