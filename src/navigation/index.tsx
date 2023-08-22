import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "../screens/homeScreen/HomeScreen"

const Stack = createNativeStackNavigator();


const StackNavigator = (props: any) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="Splash" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;