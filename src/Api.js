import axios from "axios";

const baseUrl = "https://nc-news-gxdx.onrender.com/api";

const fetchArticles = () => {
  return axios.get(`${baseUrl}/Articles`).then(({ data }) => {
    return data.article;
  });
};

const fetchTopics = () => {
  return axios.get(`${baseUrl}/Topics`).then(({ data }) => {
    return data.topics;
  });
};

const fetchArticleById = (article_id) => {
  return axios.get(`${baseUrl}/Articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export { fetchArticles, fetchTopics, fetchArticleById };
