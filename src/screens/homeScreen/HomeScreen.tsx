import React, { useEffect, useRef, useState } from "react";
import {
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useAppDispatch, useAppSelector } from "store/index";
import { RootState } from "store/reducers";
import { fetchNews, fetchTop5FromDB } from "store/actions/homeAction";
import { Article } from "types/news";

import NewsItem from "@components/newsItem";

const HomeScreen: React.FC = () => {

    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useAppDispatch();
    const apiResponse = useAppSelector((state: RootState) => state.news);
    const { news, loading } = apiResponse;

    const dripTimerRef = useRef();

    //fetch top 5 news from Db
    const fetchNextBatch = async () => {
        dispatch(fetchTop5FromDB());
    };

    //used to fetch news from api for the very first time
    useEffect(() => {
        if (news?.articles.length == 0 || news.articles.length == 100)
            dispatch(fetchNews());
    }, [news])

    //used to initiate set interval to fetch top 5 from DB
    useEffect(() => {
        if (dripTimerRef.current) {
            clearInterval(dripTimerRef.current); // Clear existing timer if any
        }
        dripTimerRef.current = setInterval(() => {
            fetchNextBatch();
        }, 10000);
        return () => {
            if (dripTimerRef.current) {
                clearInterval(dripTimerRef.current); // Clear the timer when the component unmounts
            }
        };
    }, [])

    //
    useEffect(() => {
        if (refreshing)
            setRefreshing(false);
    }, [news])


    const onRefresh = () => {
        setRefreshing(true);
        fetchNextBatch();
        clearInterval(dripTimerRef.current);
    };

    const renderItem = ({ item }: { item: Article }) => {
        return (
            <NewsItem article={item} />
        )
    }
    return (
        <>
            {loading ?
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator />
                </View>
                :
                null
            }
            <FlatList
                data={news.articles}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

export default HomeScreen;