import React, { useEffect } from "react";
import { View, Text } from 'react-native';
import { useAppSelector } from "store/index";
import { useDispatch } from "react-redux";
import { fetchHelloMessage } from "store/actions/detailsAction";

const DetailsScreen = () => {
    const dispatch = useDispatch();
    const result = useAppSelector(state => state.details)
    console.log("result --, ", result);
    useEffect(() => {
        dispatch(fetchHelloMessage())
    }, [])

    return (
        <>
            <Text>This is from Details Screen</Text>
        </>
    )
}

export default DetailsScreen;