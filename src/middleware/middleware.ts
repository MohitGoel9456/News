import { isConnectedToInternet } from 'utils/internetConnectivity';
import { getTopNewsFromDb, saveData } from 'services/storageServices';
import { fetchNewsApi } from 'services/apiServices/newsApi';
import { News } from 'types/news';


export const getLatestFromDb = async () => {
    const headlines = await getTopNewsFromDb('articles', 10);
    if (headlines) {
        return { articles: headlines, status: 'success' }
    }
}

export const fetchNewsFromServer = async () => {
    const newsData = await fetchNewsApi();
    console.log("newsData -", newsData)
    if (newsData) {
        const finalData: News = {
            ...newsData,
            articles: newsData.articles.slice(0, 10),
        };
        await saveData('articles', newsData.articles.slice(10));
        return finalData
    }
}