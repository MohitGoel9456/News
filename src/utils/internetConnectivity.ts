import NetInfo from '@react-native-community/netinfo';

export const isConnectedToInternet = async () => {
    return NetInfo.fetch().then(state => {
        return state.isConnected;
    });
}
