import axios from 'axios';

const handyNews = axios.create({
    baseURL: "https://handy-news.herokuapp.com/api"
})

export const getAllArticles = (topic) => {
    return handyNews.get(`/articles/`, { params: { topic } })
        .then((articles) => {
            return articles.data;
        })
}

export const getTopics = () => {
    return handyNews.get("/topics")
        .then((topics) => {
            return topics.data.topics
        })
}

export const getArticle = (article_id) => {
    return handyNews.get(`/articles/${article_id}`)
        .then((article) => {
            return article.data.article[0]
        })
}