import { BackHandler, Alert, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export const useExitOnBack = () => {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return; 

      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you really want to exit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true; 
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );
};
