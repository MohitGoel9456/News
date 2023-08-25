import { isConnectedToInternet } from 'utils/internetConnectivity';
import { getTopNewsFromDb, saveData } from 'services/storageServices';
import { fetchNewsApi } from 'services/apiServices/newsApi';
import { News } from 'types/news';

export const ifNoInternetConnectionReturnDataFromDB = async () => {
    const isConnected = await isConnectedToInternet();
    if (isConnected) {
        const newsData = await fetchNewsApi();
        const finalData: News = {
            ...newsData,
            articles: newsData.articles.slice(0, 10),
        };
        await saveData('articles', newsData.articles.slice(10));
        return finalData
    } else {
        const storedHeadlines = await getTopNewsFromDb('articles', 10);
        return { articles: storedHeadlines, status: 'success' }
    }
}