import * as React from 'react';
// import { TextInput } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput } from 'react-native';
const Input = ({ value, onChangeText, keyboardType, iconSource, placeholder, style, rightIcon, leftIcon }) => {

  return (
    <View
      style={[{
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
        style
      ]}
    >
      {
        leftIcon ? <Ionicons name={leftIcon} size={18} color="#808080" /> : null
      }

      <TextInput
        keyboardType={keyboardType || 'default'}
        style={{ flex: 1, marginHorizontal:5 }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || ''}
      />
      {
        rightIcon ? <Ionicons name={rightIcon} size={18} color="#808080" /> : null
      }
    </View>
  );
};

export default Input;