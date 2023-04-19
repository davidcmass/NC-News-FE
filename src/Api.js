import axios from "axios";

const articleApi = axios.create({
  baseURL: "https://nc-news-gxdx.onrender.com/api",
});

const fetchArticles = () => {
  return articleApi.get("/Articles").then(({ data }) => {
    return data.article;
  });
};

const fetchTopics = () => {
  return articleApi.get("/Topics").then(({ data }) => {
    return data.topics;
  });
};

const fetchArticleById = (article_id) => {
  return articleApi.get(`/Articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

const fetchUser = () => {
  return articleApi.get("/Users").then(({ data }) => {
    return data.users;
  });
};

const fetchComments = (article_id) => {
  return articleApi.get(`/Articles/${article_id}/Comments`).then(({ data }) => {
    return data.comments;
  });
};

export {
  fetchArticles,
  fetchTopics,
  fetchArticleById,
  fetchUser,
  fetchComments,
};
