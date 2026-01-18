import { View, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Text, Divider, Icon } from 'react-native-paper'
import Input from '../../components/Input'
import CustomButton from '../../components/Button'
import toast from 'react-native-simple-toast';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
const EmailEnter = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const handleNext = () => {
        if (!email || !email.trim()) {
            toast.show('Please enter a valid email address', toast.SHORT);
            return;
        }
        navigation.navigate('location');
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <ScrollView contentContainerStyle={{ paddingBottom: 50 }} >

                <View style={styles.container}>

                    <Image
                        source={require('../../../assets/images/vegetables.png')}
                        style={styles.headerImage}
                    />

                    <Text variant="displaySmall" style={styles.title}>
                        Get your groceries with nectar
                    </Text>

                    {/* Email */}
                    <Text style={{ marginTop: 30, color: '#808080', marginHorizontal: 20 }}>Email</Text>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#e8e8e8',
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20
                        }}
                    >
                        <TextInput
                            keyboardType="email-address"
                            style={{ flex: 1 }}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <Icon source="email-outline" size={18} color="#808080" />
                    </View>

                    <CustomButton
                        buttonText="Next"
                        style={styles.nextButton}
                        onPress={handleNext}
                    />

                    <Divider style={styles.divider} />

                    <Text variant="bodyMedium" style={styles.socialText}>
                        or connect with social media
                    </Text>

                    {/* Facebook Button */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.socialButton, styles.facebookButton]}>
                        <View style={styles.socialContent}>
                            <Image
                                source={require('../../../assets/images/facebook.png')}
                                style={styles.socialIconWhite}
                            />
                            <Text style={styles.socialButtonTextWhite}>
                                Sign in with Facebook
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Google Button */}
                    <TouchableOpacity
                        style={styles.socialButton}>
                        <View style={styles.socialContent}>
                            <Image
                                source={require('../../../assets/images/google.png')}
                                style={styles.socialIcon}
                            />
                            <Text style={styles.socialButtonText}>
                                Sign in with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default EmailEnter


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerImage: {
        width: '100%',
        height: '40%',
        resizeMode: 'cover',
    },

    title: {
        marginHorizontal: 20,
        width: '80%',
    },

    input: {
        marginTop: 10,
    },

    nextButton: {
        marginTop: 20,
        alignSelf: 'center',
    },

    divider: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
    },

    socialText: {
        color: '#808080',
        alignSelf: 'center',
    },

    socialButton: {
        flexDirection: 'row',
        width: '80%',
        height: 60,
        borderRadius: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    facebookButton: {
        backgroundColor: '#4A66AC',
    },

    socialContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '60%',
    },

    socialIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },

    socialIconWhite: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: '#fff',
    },

    socialButtonText: {
        fontWeight: '700',
        fontSize: 15,
        marginLeft: 20,
    },

    socialButtonTextWhite: {
        fontWeight: '700',
        fontSize: 15,
        marginLeft: 20,
        color: '#fff',
    },
})
