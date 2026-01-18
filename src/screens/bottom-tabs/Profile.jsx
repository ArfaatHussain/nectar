import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Text, Avatar } from 'react-native-paper';
import useStore from '../../store/useStore';
import { getDimensions } from '../../utils/getDimensions';
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { height, width } = getDimensions();

const menuItems = [
  { label: 'Orders', icon: <Feather name="shopping-bag" /> },
  { label: 'My Details', icon: <MaterialCommunityIcons name="card-account-details-outline" /> },
  { label: 'Delivery Address', icon: <MaterialCommunityIcons name="map-marker-outline" /> },
  { label: 'Payment Methods', icon: <MaterialCommunityIcons name="credit-card-outline" /> },
  { label: 'Promo Card', icon: <MaterialCommunityIcons name="ticket-percent-outline" /> },
  { label: 'Notifications', icon: <MaterialCommunityIcons name="bell-outline" /> },
  { label: 'Help', icon: <MaterialCommunityIcons name="help-circle-outline" /> },
  { label: 'About', icon: <MaterialCommunityIcons name="information-outline" /> },
  { label: 'Logout', icon: <MaterialCommunityIcons name="logout" /> },
];

const Profile = () => {
  const user = useStore((state) => state.user);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom:50}} >
        {/* Header */}
        <View style={styles.header}>
          <Avatar.Image size={40} source={{ uri: user?.avatar }} />
          <View style={styles.userInfo}>
            <Text variant="titleLarge">{user?.name}</Text>
            <Text variant="bodySmall" style={styles.email}>
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Menu */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={item.onPress}
            style={styles.row}
          >
            {React.cloneElement(item.icon, {
              size: width * 0.05,
              color: item.label === 'Logout' ? '#E53935' : 'black',
            })}

            <Text
              variant="labelLarge"
              style={[
                styles.label,
                item.label === 'Logout' && { color: '#E53935' },
              ]}
            >
              {item.label}
            </Text>

            {item.label !== 'Logout' && (
              <AntDesign name="right" size={width * 0.05} color="black" />
            )}
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
};

export default Profile;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:10
  },
  userInfo: {
    marginLeft: 10,
  },
  email: {
    color: '#808080',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    flex: 1,
    marginLeft: 10,
  },
});
