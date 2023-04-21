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

const articleVote = (article_id, voteNum) => {
  return articleApi
    .patch(`/Articles/${article_id}`, { inc_votes: voteNum })
    .then(({ data }) => {
      return data.article;
    });
};

const commentPost = (article_id, commentObj) => {
  return articleApi
    .post(`/Articles/${article_id}/Comments`, commentObj)
    .then(({ data }) => {
      return data.comment;
    });
};

const deleteComment = (comment_id) => {
  return articleApi.delete(`/comments/${comment_id}`);
};

const fetchArticleTopic = (topic) => {
  return articleApi.get(`/Articles?topic=${topic}`).then(({ data }) => {
    return data.topic;
  });
};

export {
  fetchArticles,
  fetchTopics,
  fetchArticleById,
  fetchUser,
  fetchComments,
  articleVote,
  commentPost,
  deleteComment,
  fetchArticleTopic,
};
