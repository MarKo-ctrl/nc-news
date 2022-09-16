import axios from 'axios';


const handyNews = axios.create({
  // baseURL: 'https://handy-news.herokuapp.com/api'
  baseURL: 'http://127.0.0.1:9090/api/'

})

export const getAllArticles = (topic) => {
  return handyNews.get(`/articles/`, { params: { topic } })
    .then((articles) => {
      return articles;
    })
}

export const getTopics = () => {
  return handyNews.get('/topics')
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

export const patchVote = (article_id, inc_vote) => {
  return handyNews.patch(`/articles/${article_id}`, inc_vote)
    .then((article) => {
      return article.data
    })
}

export const getComments = (article_id) => {
  return handyNews.get(`/articles/${article_id}/comments`)
    .then((comments) => {
      return comments.data.rows
    })
}

export const signin = (user) => {
  return handyNews.post('/users/signin', user)
    .then((res) => {
      delete res.data[0].password
      return res
    })
}

export const signup = (user) => {
  return handyNews.post('/users/signup', user)
    .then((res) => {
      delete res.data[0].password
      return res
    })
}

export const postComment = (article_id, comment) => {
  return handyNews.post(`/articles/${article_id}/comments`, comment)
    .then((newComment) => {
      return newComment.data
    })
}

export const deleteComment = (comment_id) => {
  return handyNews.delete(`/comments/${comment_id}`)
}
