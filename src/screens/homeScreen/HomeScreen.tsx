import React, { useEffect, useRef, useState } from "react";
import {
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    StyleSheet,
    Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
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
        }, 100000);
        return () => {
            if (dripTimerRef.current) {
                clearInterval(dripTimerRef.current); // Clear the timer when the component unmounts
            }
        };
    }, [])

    //used for pull to refresh
    useEffect(() => {
        if (refreshing)
            setRefreshing(false);
    }, [news])


    const onRefresh = () => {
        setRefreshing(true);
        fetchNextBatch();
        clearInterval(dripTimerRef.current);
    };

    const onPressPinMenu = () => {

    }

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 120],
            outputRange: [-0, 0],
            extrapolate: 'clamp',
        });
        return (
            <View>
                <RectButton style={styles.leftAction} onPress={onPressPinMenu}>
                    <Animated.Text
                        style={[
                            styles.actionText,
                            {
                                transform: [{ translateX: trans }],
                            },
                        ]}>
                        Pin
                    </Animated.Text>
                </RectButton>
                <RectButton style={styles.deleteAction} >
                    <Animated.Text
                        style={[
                            styles.actionText,
                            {
                                transform: [{ translateX: trans }],
                            },
                        ]}>
                        Delete
                    </Animated.Text>
                </RectButton>
            </View>

        );
    };

    const renderItem = ({ item }: { item: Article }) => {
        return (
            <Swipeable renderRightActions={renderRightActions}>
                <NewsItem article={item} />
            </Swipeable>
        )
    }

    return (
        <GestureHandlerRootView>
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
        </GestureHandlerRootView>
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
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    deleteAction: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
    },
})

export default HomeScreen;