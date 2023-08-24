import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { Article } from 'types/news';
import Card from './card';
import news from "assets/images/news.png";

interface NewsItem {
    article: Article
}

const NewsItem = (props: NewsItem) => {
    const { title, urlToImage, publishedAt } = props.article;

    var date = new Date(publishedAt);
    const publishedDate = date.toString().slice(3, 15);

    const imageUrl = urlToImage == null ? news : { uri: urlToImage };

    return (
        <>
            <Card>
                <Image
                    style={styles.tinyLogo}
                    source={imageUrl}
                />
                <View style={styles.container}>
                    <Text style={styles.textMargin}>{title}</Text>
                    <Text style={styles.textMargin}>{publishedDate}</Text>
                </View>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    tinyLogo: {
        width: '100%',
        height: 150,
    },
    textMargin: {
        marginTop: 4
    },
});

export default NewsItem