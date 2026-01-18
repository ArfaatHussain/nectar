import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/screens/auth/Splash';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Welcome from './src/screens/auth/Welcome';
import { PaperProvider } from 'react-native-paper';
import EmailEnter from './src/screens/auth/EmailEnter';
import Location from './src/screens/auth/Location';
import LocationSearch from './src/screens/auth/LocationSearch';
import AppNavigation from './src/navigations/AppNavigation';
import Register from './src/screens/auth/Register';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
   
      <PaperProvider>
        <SafeAreaProvider style={{ flex: 1 }} >
          <SafeAreaView style={styles.container}>

            <AppNavigation />
            <StatusBar style="auto" />

          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
