import Config from 'react-native-config';

const apiKey = Config.API_KEY;

export const Header = () => {
    if (apiKey) {
        return {
            'Authorization': apiKey
        }
    }
}