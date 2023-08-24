import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    RefreshControl
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
    const { news } = apiResponse;

    const dripTimerRef = useRef();
    // const flatListRef = useRef(null);
    // const scrollPositionRef = useRef(0);

    const fetchNextBatch = async () => {
        dispatch(fetchTop5FromDB());
    };

    console.log("news --", news.articles.length);
    //used to fetch news from api for the very first time
    useEffect(() => {
        if (news?.articles.length == 1 || news.articles.length == 100)
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
    })

    //
    useEffect(() => {
        if (refreshing)
            setRefreshing(false);
    }, [news])

    // useEffect(() => {
    //     if (flatListRef.current) {
    //         flatListRef.current.scrollToOffset({ offset: scrollPositionRef.current, animated: false });
    //     }
    // }, [news]);

    // const handleScroll = (event: any) => {
    //     scrollPositionRef.current = event.nativeEvent.contentOffset.y;
    // };

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
        <View>
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
        </View>
    )
}

export default HomeScreen;