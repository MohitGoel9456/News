import React from 'react';
import {
    Image,
    Text,
    StyleSheet
} from 'react-native';

const NewsItem = () => {
    return (
        <>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
            <Text>title</Text>
            <Text>Published</Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

export default NewsItem