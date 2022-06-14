import axios from 'axios';

const handyNews = axios.create({
    baseURL: "https://handy-news.herokuapp.com/api"
})

export const getAllArticles = () => {
    return handyNews.get("/articles")
        .then((articles) => {
            return articles.data;
        })
}

export const getTopics = () => {
    return handyNews.get("/topics")
    .then((topics) => {
        return topics.data.topics
        // console.log(topics.data.topics[0].slug)
    })
}