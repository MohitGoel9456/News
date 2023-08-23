import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { replace } from "utils/navigationContainer";
import { useNavigation } from '@react-navigation/native';

const App = () => {
    useEffect(() => {
        // Hide the splash screen after a delay
        SplashScreen.hide();
    }, []);

};

export default SplashScreen;

