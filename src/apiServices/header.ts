const accessToken = undefined;
import Config from 'react-native-config';

const apiKey = Config.API_KEY;

const headers = {
    'Content-Type': 'application/json'
}
export const Header = () => {
    if (accessToken) {
        return {
            ...headers,
            'Authorization': apiKey
        }
    } else {
        return headers;
    }
}