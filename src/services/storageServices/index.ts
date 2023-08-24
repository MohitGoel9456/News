import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageResponse } from "types/news";

const getData = async (key: string): Promise<StorageResponse> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            const data = JSON.parse(value);
            return { data, error: null };
        } else {
            return { data: null, error: 'Data not found.' };
        }
    } catch (error) {
        return { data: null, error: 'Error retrieving data from storage.' };
    }
};

const saveData = async (key: string, data: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue,);
        console.log("susccees")
    } catch (error) {
        throw new Error('Error saving data to storage.');
    }
};

export {
    getData,
    saveData
}