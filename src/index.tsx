import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ListScreen from 'src/screens/list';
import DetailsScreen from 'src/screens/details';
import { RootStackTypes } from './types/navigaiton';

const Stack = createNativeStackNavigator<RootStackTypes>();

export default function App() {
  return (
    // to manage notch
    <SafeAreaProvider>
      {/* Navigation */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
