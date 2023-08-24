import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { useAppDispatch, useAppSelector } from "store/index";
import { RootState } from "store/reducers";
import { fetchNews } from "store/actions/homeAction";
import { Article } from "types/news";

import NewsItem from "@components/newsItem";

const HomeScreen: React.FC = () => {

    const dispatch = useAppDispatch();
    const apiResponse = useAppSelector((state: RootState) => state.news);
    const { news } = apiResponse;

    useEffect(() => {
        dispatch(fetchNews());
    }, [])

    const renderItem = ({ item }: { item: Article }) => {
        return (
            <NewsItem article={item} />
        )
    }

    return (
        <View>
            <FlatList
                data={news.articles}
                renderItem={renderItem}
            />
        </View>
    )
}

export default HomeScreen;