import React, { useEffect } from "react";
import {
    View,
    Text
} from 'react-native';
import { useAppDispatch, useAppSelector } from "store/index";
import { RootState } from "store/reducers";
import { fetchNews } from "store/actions/homeAction";

const HomeScreen: React.FC = () => {

    const dispatch = useAppDispatch();
    const apiResponse = useAppSelector((state: RootState) => state.news);
    useEffect(() => {
        dispatch(fetchNews());
    }, [])

    return (
        <View>
            <Text>Hi! I am at home screen.</Text>
        </View>
    )
}

export default HomeScreen;