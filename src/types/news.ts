export interface Article {
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    source: {
        id: string,
        name: string
    },
    publishedAt: string
}

export interface News {
    articles: Article[],
    status: string
}

export interface NewsState {
    loading: boolean,
    error: string
    news: News
}

export interface StorageResponse {
    data: Article | null;
    error: string | null;
}