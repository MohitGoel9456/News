export interface News {
    articles: [
        {
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
    ],
    status: string
}

export interface NewsState {
    loading: boolean,
    error: string
    news: News
}