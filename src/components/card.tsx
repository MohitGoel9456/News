import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

interface Iprops {
    children: React.ReactNode;
}

const Card: React.FC<Iprops> = ({ children }) => {


    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        margin: 8
    }
})

export default Card;